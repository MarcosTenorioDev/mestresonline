import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root


const TabsListVariants = cva(
  " inline-flex items-center justify-start h-9",
  {
    variants: {
      variant: {
        default:
          "rounded-lg bg-muted/30 p-1",
        underline:
          "border-b rounded-none bg-background p-0",
      },
      size: {
        default: "h-9",
        sm: "h-8  text-xs",
        lg: "h-10 ",
        icon: "h-9 w-9",
      },
      width:{
        default:"w-full",
        fit:"w-fit"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width:"default"
    },
  }
)


const TabsTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-normal  transition-all disabled:pointer-events-none data-[state=active]:text-foreground px-3",
    {
      variants: {
        variant: {
          default:
            "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:font-bold text-current ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:shadow disabled:opacity-50 rounded-md py-1",
          underline:
            "bg-background border-b-2 text-muted-foreground border-background focus:border-primary data-[state=active]:font-bold ring-0 outline-none shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:bg-muted data-[state=active]:border-primary disabled:opacity-100 data-[state=active]:shadow-none rounded-none m-0 pt-1.5 pb-2 hover:bg-background-muted",
        },
        size: {
          default: "text-sm",
          sm: " text-xs",
          lg: "text-md",
          icon: "h-9 w-9",
        },
        width:{
          default:"w-full",
          fit:"w-fit"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default",
        width:"default"
      },
    }
  )


 

  export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
    variant?: "default"|"underline" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    width?: "default" | "fit" | null | undefined;
  }
  
  

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className,variant,size,width, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      TabsListVariants({ variant,size,width, className })
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TabsTriggerVariants> {
  asChild?: boolean
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, width, ...props }, ref) => {
  const { value, ...restProps } = props as { value: string } & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        TabsTriggerVariants({ variant, size, width, className })
      )}
      value={value}
      {...restProps}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }