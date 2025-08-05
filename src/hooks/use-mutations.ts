import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface HasId {
  id: string;
}

interface BaseService<T, P> {
  create: (payload: P) => Promise<T>;
  update: (id: string, payload: Partial<P>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

interface MutationConfig<T extends HasId, P> {
  service: BaseService<T, P>;
  queryKeys: {
    lists: () => string[];
    all: string[];
  };
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  onSuccess?: {
    create?: (data: T) => void;
    update?: (data: T) => void;
    delete?: (id: string) => void;
  };
}

export function useMutations<T extends HasId, P>(config: MutationConfig<T, P>) {
  const queryClient = useQueryClient();

  const handleSuccess = (type: 'create' | 'update' | 'delete', data?: T, id?: string) => {
    // Invalidation automatique des queries
    queryClient.invalidateQueries({ queryKey: config.queryKeys.lists() });
    queryClient.invalidateQueries({ queryKey: config.queryKeys.all });
    
    // Message de succès
    if (config.successMessages?.[type]) {
      toast.success(config.successMessages[type]);
    }
    
    // Callback personnalisé
    if (config.onSuccess?.[type]) {
      if (type === 'delete' && id) {
        (config.onSuccess[type] as (id: string) => void)(id);
      } else if (data) {
        (config.onSuccess[type] as (data: T) => void)(data);
      }
    }
  };

  const create = useMutation({
    mutationFn: config.service.create,
    onSuccess: (data) => handleSuccess('create', data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la création');
    }
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<P> }) =>
      config.service.update(id, payload),
    onSuccess: (data) => handleSuccess('update', data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    }
  });

  const remove = useMutation({
    mutationFn: config.service.delete,
    onSuccess: (_, id) => handleSuccess('delete', undefined, id),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: config.queryKeys.lists(),
      refetchType: 'all'
    });
  };

  return {
    create: create.mutate,
    isCreating: create.isPending,
    update: update.mutate,
    isUpdating: update.isPending,
    remove: remove.mutate,
    isRemoving: remove.isPending,
    invalidate
  };
}
