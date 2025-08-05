import { cn } from "../utils/style";
import { ComponentProps, ReactNode } from "react";

type ColorVariant = 'default' | 'primary' | 'secondary' | 'error';

export function Card(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"rounded-2xl bg-arvox-blue-transparent-1",
				props.className
			)}
		/>
	);
}

export function CardTitle({
	title,
	titleColor = 'default',
	subtitle,
	actions,
	className,
}: {
	title: string;
	titleColor?: ColorVariant
	subtitle?: string;
	className?: string;
	actions?: ReactNode;
}) {
	return (
		<div className={cn("bg-arvox-blue-transparent-2 py-4 px-5 rounded-tl-2xl rounded-tr-2xl", className)}>
			{/* Note: Typography component would need to be imported from the same library */}
			<h3 className={cn("font-bold uppercase", 
				titleColor === 'primary' && "text-arvox-primary",
				titleColor === 'secondary' && "text-arvox-secondary", 
				titleColor === 'error' && "text-red-500",
				titleColor === 'default' && "text-white"
			)}>
				{title}
			</h3>
			{subtitle && (
				<p className="text-white">
					{subtitle}
				</p>
			)}
			{actions}
		</div>
	);
}

export function CardContent(props: ComponentProps<"div">) {
	return <div {...props} className={cn("w-full p-5", props.className)} />;
}

export function CardFooter(props: ComponentProps<"div">) {
	return <div {...props} className={cn("w-full p-5 rounded-bl-2xl rounded-br-2xl", props.className)} />;
}
