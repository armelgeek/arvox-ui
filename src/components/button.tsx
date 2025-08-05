
import { cn } from "../utils/style";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> &
	VariantProps<typeof btnContainerVariant> &
	VariantProps<typeof btnVariant> & {
		innerClassName?: string;
	};

export function Button({ variant, size, children, ...props }: Props) {
	return (
		<button
			className={cn(
				"group w-auto rounded-[0.825rem]",
				"bg-arvox-blue-transparent-2",
				"p-[0.3rem] active:scale-95 transition-transform duration-100",
				props?.className
			)}
			{...props}
		>
			<div
				className={cn(
					"rounded-[0.625rem] p-0.5 w-full h-full",
					btnContainerVariant({ variant: variant })
				)}
			>
				<div
					className={cn(
						"rounded-[0.475rem]",
						"w-full h-full",
						"uppercase font-extrabold flex items-center", props?.innerClassName,
						btnVariant({ variant: variant, size: size })
					)}
				>
					{children}
				</div>
			</div>
		</button>
	);
}

const btnContainerVariant = cva(
	"text-shadow-[2px_3px_rgba(0_0_0_/_0.25)] cursor-pointer",
	{
		variants: {
			variant: {
				primary:
					"bg-[linear-gradient(180deg,#FFAC7C_0%,rgba(255,255,255,0)_100%)] bg-[#FA4616] group-hover:bg-[#982506]",
				secondary:
					"bg-[linear-gradient(180deg,#7EDAFD_0%,rgba(255,255,255,0)_100%)] bg-[#0040B6]",
				disable:
					"bg-[linear-gradient(180deg,#CBCBCB_0%,rgba(255,255,255,0)_100%)] bg-[#5B5B5B]",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

const btnVariant = cva("", {
	variants: {
		variant: {
			primary:
				"bg-[linear-gradient(180deg,_#FF7F32_0%,#FA4616_100%)] group-hover:bg-[linear-gradient(180deg,#FF7F32_0%,#FA4616_41%,#982506_100%)] text-white",
			secondary:
				"bg-[linear-gradient(180deg,#006EB6_0%,#0040B6_100%)] group-hover:bg-[linear-gradient(180deg,#006EB6_0%,#0040B6_41%,#002C7C_100%)] text-white",
			disable:
				"bg-[linear-gradient(180deg,#888888_0%,#5B5B5B_100%)] text-[rgba(255,255,255,0.4)] cursor-not-allowed",
		},
		size: {
			normal: "px-8 py-4 text-base",
			small: "px-5 py-4 text-sm",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "normal",
	},
});
