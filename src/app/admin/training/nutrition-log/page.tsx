
'use client';

import { useState } from "react";
import { 
  UserSquare, Save, HeartPulse, Utensils, Bed, StickyNote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- Reusable Components ---
const SectionCard = ({ icon: Icon, title, description, children }: { icon: React.ElementType, title: string, description?: string, children: React.ReactNode }) => (
  <Card className="rounded-3xl shadow-xl">
    <CardHeader className="p-8 pb-4">
      <CardTitle className="text-xl font-headline flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary"/> {title}
      </CardTitle>
      {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="p-8 pt-0">
      {children}
    </CardContent>
  </Card>
);

const MetricInput = ({ label, unit, ...props }: { label: string, unit: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input type="number" step="0.1" className="h-12 rounded-xl font-mono" {...props} />
      <span className="text-sm font-mono text-muted-foreground">{unit}</span>
    </div>
  </div>
);

const RatingSlider = ({ label, value, onValueChange, max = 10, step = 1 }: { label: string, value: number, onValueChange: (value: number) => void, max?: number, step?: number }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <Label>{label}</Label>
      <span className="font-mono font-bold text-lg text-primary w-8 text-center">{value}</span>
    </div>
    <Slider
      defaultValue={[value]}
      max={max}
      min={1}
      step={step}
      onValueChange={(v) => onValueChange(v[0])}
      className="[&>span:first-child]:h-1"
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```
- src/components/ui/switch.tsx:
```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```
- src/components/ui/table.tsx:
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "font-medium bg-muted/50 [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```
- src/components/ui/tabs.tsx:
```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

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
```
- src/components/ui/textarea.tsx:
```tsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
```
- src/components/ui/toast.tsx:
```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```
- src/components/ui/toaster.tsx:
```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```
- src/components/ui/toggle-group.tsx:
```tsx
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
```
- src/components/ui/toggle.tsx:
```tsx
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
```
- src/components/ui/tooltip.tsx:
```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```
- src/firebase/client-provider.tsx:
```tsx
'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const firebaseServices = useMemo(() => {
    // Initialize Firebase on the client side, once per component mount.
    return initializeFirebase();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
```
- src/firebase/config.ts:
```ts
export const firebaseConfig = {
  "projectId": "kultur-juara-ba-59925955-1dbff",
  "appId": "1:291819472204:web:4829f804ce1bc65aa5bbe9",
  "apiKey": "AIzaSyAHBF71q0ndY7qBS9iU8WejyxLHvbBuMhA",
  "authDomain": "kultur-juara-ba-59925955-1dbff.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "291819472204"
};
```
- src/firebase/error-emitter.ts:
```ts
'use client';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Defines the shape of all possible events and their corresponding payload types.
 * This centralizes event definitions for type safety across the application.
 */
export interface AppEvents {
  'permission-error': FirestorePermissionError;
}

// A generic type for a callback function.
type Callback<T> = (data: T) => void;

/**
 * A strongly-typed pub/sub event emitter.
 * It uses a generic type T that extends a record of event names to payload types.
 */
function createEventEmitter<T extends Record<string, any>>() {
  // The events object stores arrays of callbacks, keyed by event name.
  // The types ensure that a callback for a specific event matches its payload type.
  const events: { [K in keyof T]?: Array<Callback<T[K]>> } = {};

  return {
    /**
     * Subscribe to an event.
     * @param eventName The name of the event to subscribe to.
     * @param callback The function to call when the event is emitted.
     */
    on<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        events[eventName] = [];
      }
      events[eventName]?.push(callback);
    },

    /**
     * Unsubscribe from an event.
     * @param eventName The name of the event to unsubscribe from.
     * @param callback The specific callback to remove.
     */
    off<K extends keyof T>(eventName: K, callback: Callback<T[K]>) {
      if (!events[eventName]) {
        return;
      }
      events[eventName] = events[eventName]?.filter(cb => cb !== callback);
    },

    /**
     * Publish an event to all subscribers.
     * @param eventName The name of the event to emit.
     * @param data The data payload that corresponds to the event's type.
     */
    emit<K extends keyof T>(eventName: K, data: T[K]) {
      if (!events[eventName]) {
        return;
      }
      events[eventName]?.forEach(callback => callback(data));
    },
  };
}

// Create and export a singleton instance of the emitter, typed with our AppEvents interface.
export const errorEmitter = createEventEmitter<AppEvents>();
```
- src/firebase/errors.ts:
```ts
'use client';
import { getAuth, type User } from 'firebase/auth';

type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete' | 'write';
  requestResourceData?: any;
};

interface FirebaseAuthToken {
  name: string | null;
  email: string | null;
  email_verified: boolean;
  phone_number: string | null;
  sub: string;
  firebase: {
    identities: Record<string, string[]>;
    sign_in_provider: string;
    tenant: string | null;
  };
}

interface FirebaseAuthObject {
  uid: string;
  token: FirebaseAuthToken;
}

interface SecurityRuleRequest {
  auth: FirebaseAuthObject | null;
  method: string;
  path: string;
  resource?: {
    data: any;
  };
}

/**
 * Builds a security-rule-compliant auth object from the Firebase User.
 * @param currentUser The currently authenticated Firebase user.
 * @returns An object that mirrors request.auth in security rules, or null.
 */
function buildAuthObject(currentUser: User | null): FirebaseAuthObject | null {
  if (!currentUser) {
    return null;
  }

  const token: FirebaseAuthToken = {
    name: currentUser.displayName,
    email: currentUser.email,
    email_verified: currentUser.emailVerified,
    phone_number: currentUser.phoneNumber,
    sub: currentUser.uid,
    firebase: {
      identities: currentUser.providerData.reduce((acc, p) => {
        if (p.providerId) {
          acc[p.providerId] = [p.uid];
        }
        return acc;
      }, {} as Record<string, string[]>),
      sign_in_provider: currentUser.providerData[0]?.providerId || 'custom',
      tenant: currentUser.tenantId,
    },
  };

  return {
    uid: currentUser.uid,
    token: token,
  };
}

/**
 * Builds the complete, simulated request object for the error message.
 * It safely tries to get the current authenticated user.
 * @param context The context of the failed Firestore operation.
 * @returns A structured request object.
 */
function buildRequestObject(context: SecurityRuleContext): SecurityRuleRequest {
  let authObject: FirebaseAuthObject | null = null;
  try {
    // Safely attempt to get the current user.
    const firebaseAuth = getAuth();
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
      authObject = buildAuthObject(currentUser);
    }
  } catch {
    // This will catch errors if the Firebase app is not yet initialized.
    // In this case, we'll proceed without auth information.
  }

  return {
    auth: authObject,
    method: context.operation,
    path: `/databases/(default)/documents/${context.path}`,
    resource: context.requestResourceData ? { data: context.requestResourceData } : undefined,
  };
}

/**
 * Builds the final, formatted error message for the LLM.
 * @param requestObject The simulated request object.
 * @returns A string containing the error message and the JSON payload.
 */
function buildErrorMessage(requestObject: SecurityRuleRequest): string {
  return `Missing or insufficient permissions: The following request was denied by Firestore Security Rules:
${JSON.stringify(requestObject, null, 2)}`;
}

/**
 * A custom error class designed to be consumed by an LLM for debugging.
 * It structures the error information to mimic the request object
 * available in Firestore Security Rules.
 */
export class FirestorePermissionError extends Error {
  public readonly request: SecurityRuleRequest;

  constructor(context: SecurityRuleContext) {
    const requestObject = buildRequestObject(context);
    super(buildErrorMessage(requestObject));
    this.name = 'FirebaseError';
    this.request = requestObject;
  }
}
```
- src/firebase/firestore/use-collection.tsx:
```tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/* Internal implementation of Query:
  https://github.com/firebase/firebase-js-sdk/blob/c5f08a9bc5da0d2b0207802c972d53724ccef055/packages/firestore/src/lite-api/reference.ts#L143
*/
export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
      toString(): string;
    }
  }
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 * Handles nullable references/queries.
 * 
 *
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedTargetRefOrQuery or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *  
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} targetRefOrQuery -
 * The Firestore CollectionReference or Query. Waits if null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, error.
 */
export function useCollection<T = any>(
    memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & {__memo?: boolean})  | null | undefined,
): UseCollectionResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedTargetRefOrQuery) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Directly use memoizedTargetRefOrQuery as it's assumed to be the final query
    const unsubscribe = onSnapshot(
      memoizedTargetRefOrQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const results: ResultItemType[] = [];
        for (const doc of snapshot.docs) {
          results.push({ ...(doc.data() as T), id: doc.id });
        }
        setData(results);
        setError(null);
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        // This logic extracts the path from either a ref or a query
        const path: string =
          memoizedTargetRefOrQuery.type === 'collection'
            ? (memoizedTargetRefOrQuery as CollectionReference).path
            : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString()

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        // trigger global error propagation
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedTargetRefOrQuery]); // Re-run if the target query/reference changes.
  if(memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error(memoizedTargetRefOrQuery + ' was not properly memoized using useMemoFirebase');
  }
  return { data, isLoading, error };
}
```
- src/firebase/firestore/use-doc.tsx:
```tsx
'use client';
    
import { useState, useEffect } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a single Firestore document in real-time.
 * Handles nullable references.
 * 
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedTargetRefOrQuery or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The Firestore DocumentReference. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  memoizedDocRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    if (!memoizedDocRef) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    // Optional: setData(null); // Clear previous data instantly

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (snapshot: DocumentSnapshot<DocumentData>) => {
        if (snapshot.exists()) {
          setData({ ...(snapshot.data() as T), id: snapshot.id });
        } else {
          // Document does not exist
          setData(null);
        }
        setError(null); // Clear any previous error on successful snapshot (even if doc doesn't exist)
        setIsLoading(false);
      },
      (error: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: memoizedDocRef.path,
        })

        setError(contextualError)
        setData(null)
        setIsLoading(false)

        // trigger global error propagation
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedDocRef]); // Re-run if the memoizedDocRef changes.

  return { data, isLoading, error };
}
```
- src/firebase/index.ts:
```ts
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! initializeApp() is called without any arguments because Firebase App Hosting
    // integrates with the initializeApp() function to provide the environment variables needed to
    // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
    // without arguments.
    let firebaseApp;
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      firebaseApp = initializeApp();
    } catch (e) {
      // Only warn in production because it's normal to use the firebaseConfig to initialize
      // during development
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
```
- src/firebase/non-blocking-login.tsx:
```tsx
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
```
- src/firebase/non-blocking-updates.tsx:
```tsx
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) {
  setDoc(docRef, data, options).catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
  })
  // Execution continues immediately
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: data,
        })
      )
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}
```
- src/firebase/provider.tsx:
```tsx
'use client';

import React, { DependencyList, createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener'

interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

// Internal state for user authentication
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean; // True if core services (app, firestore, auth instance) are provided
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null; // The Auth service instance
  // User authentication state
  user: User | null;
  isUserLoading: boolean; // True during initial auth check
  userError: Error | null; // Error from auth listener
}

// Return type for useFirebase()
export interface FirebaseServicesAndUser {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Return type for useUser() - specific to user auth state
export interface UserHookResult { // Renamed from UserAuthHookResult for consistency if desired, or keep as UserAuthHookResult
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true, // Start loading until first auth event
    userError: null,
  });

  // Effect to subscribe to Firebase auth state changes
  useEffect(() => {
    if (!auth) { // If no Auth service instance, cannot determine user state
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not provided.") });
      return;
    }

    setUserAuthState({ user: null, isUserLoading: true, userError: null }); // Reset on auth instance change

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => { // Auth state determined
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => { // Auth listener error
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe(); // Cleanup
  }, [auth]); // Depends on the auth instance

  // Memoize the context value
  const contextValue = useMemo((): FirebaseContextState => {
    const servicesAvailable = !!(firebaseApp && firestore && auth);
    return {
      areServicesAvailable: servicesAvailable,
      firebaseApp: servicesAvailable ? firebaseApp : null,
      firestore: servicesAvailable ? firestore : null,
      auth: servicesAvailable ? auth : null,
      user: userAuthState.user,
      isUserLoading: userAuthState.isUserLoading,
      userError: userAuthState.userError,
    };
  }, [firebaseApp, firestore, auth, userAuthState]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

/**
 * Hook to access core Firebase services and user authentication state.
 * Throws error if core services are not available or used outside provider.
 */
export const useFirebase = (): FirebaseServicesAndUser => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable || !context.firebaseApp || !context.firestore || !context.auth) {
    throw new Error('Firebase core services not available. Check FirebaseProvider props.');
  }

  return {
    firebaseApp: context.firebaseApp,
    firestore: context.firestore,
    auth: context.auth,
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
  };
};

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};

/** Hook to access Firebase App instance. */
export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  return firebaseApp;
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserHookResult => { // Renamed from useAuthUser
  const { user, isUserLoading, userError } = useFirebase(); // Leverages the main hook
  return { user, isUserLoading, userError };
};
```
- src/hooks/use-mobile.tsx:
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```
- src/hooks/use-toast.ts:
```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```
- src/lib/bcc-team-rules.ts:
```ts
// src/lib/bcc-team-rules.ts

export type PlayerLevel = "BEGINNER";

export interface TeamSlotRule {
  id: string;
  label: string;
  level: PlayerLevel;
  capacity: number; 
  required: boolean;
}

export interface CategoryRule {
  minPlayers: number;
  maxPlayers: number;
  slots: TeamSlotRule[];
}

// Aturan baru yang disederhanakan untuk tim independen (Ganda)
// Min 1 (jika main tunggal) dan Max 2 (jika main ganda)
const INDEPENDENT_TEAM_RULE: CategoryRule = {
    minPlayers: 1,
    maxPlayers: 2,
    slots: [
      { id: "player_1", label: "Pemain 1", level: "BEGINNER", capacity: 1, required: true }, // Level di sini hanya placeholder
      { id: "player_2", label: "Pemain 2 (Opsional)", level: "BEGINNER", capacity: 1, required: false },
    ]
};


export const BCC_RULES: Record<string, CategoryRule> = {
  "BEGINNER": INDEPENDENT_TEAM_RULE,
};
```
- src/lib/committee-data.ts:
```ts
export type CommitteeMember = {
  position: string;
  name: string;
  id?: string; // Bisa dihubungkan ke User ID login nanti
};

export type CommitteeDivision = {
  id: string;
  title: string;
  members: CommitteeMember[];
};

export const INITIAL_COMMITTEE_STRUCTURE: CommitteeDivision[] = [
  {
    id: "SC",
    title: "PANITIA INTI (STEERING COMMITTEE)",
    members: [
      { position: "Project Director", name: "Irsyad Jamal Pratama Putra" },
      { position: "Sekretaris 1", name: "Rizki Karami" },
      { position: "Sekretaris 2", name: "Annisa Syafira" },
      { position: "Bendahara", name: "Selvi Yulia" },
    ]
  },
  {
    id: "MATCH",
    title: "BIDANG PERTANDINGAN & INTEGRITAS",
    members: [
      { position: "Koordinator", name: "Wicky (PBSI)" },
      { position: "Match Liaison Officer (MLO)", name: "Sarah Fatmawati" },
      { position: "Ketua Tim Verifikasi Teknis (TVT)", name: "Anindiffa Pandu Prayuda" },
      { position: "Anggota TVT", name: "Aulia Febrianto" },
      { position: "Anggota TVT", name: "Faiz Azilla Syaehon" },
    ]
  },
  {
    id: "BUSINESS",
    title: "BIDANG KOMERSIAL (BUSINESS)",
    members: [
      { position: "Koordinator", name: "Teri Taufiq Mulyadi" },
      { position: "Sponsorship Liaison", name: "Ali Wardana" },
      { position: "Tenant Relations", name: "Risca Amalia" },
    ]
  },
  {
    id: "MEDIA",
    title: "BIDANG ACARA & KREATIF (SHOW & MEDIA)",
    members: [
      { position: "Koordinator", name: "Rizki Karami" },
      { position: "Media & Sosmed", name: "Susi" },
      { position: "Content Creator", name: "Sarah Maulidina" },
      { position: "Dokumentasi", name: "Rizky Mauludin" },
    ]
  },
  {
    id: "OPS",
    title: "BIDANG OPERASIONAL UMUM",
    members: [
      { position: "Koordinator", name: "Kevin Deriansyah Budiman" },
      { position: "Keamanan & Gate", name: "Muhammad Nur Sidiq Buana" },
      { position: "Medis", name: "Ananda Putri" },
      { position: "Registrasi & Check-in", name: "Norma Ayu Laras Tyas" },
      { position: "Logistik", name: "Alfin" },
    ]
  },
  {
    id: "IT",
    title: "BIDANG IT & DIGITAL",
    members: [
        { position: "Koordinator", name: "Irsyad Jamal Pratama Putra" },
        { position: "System Information", name: "" }, // Vacant
        { position: "Website & Platform", name: "" }, // Volunteer
    ]
  },
   {
    id: "LEGAL",
    title: "BIDANG HUKUM & KEPATUHAN",
    members: [
        { position: "Koordinator", name: "Lidya" },
        { position: "Perizinan", name: "" }, // Vacant
        { position: "Legal & Regulasi", name: "" }, // Vacant
    ]
  }
];
```
- src/lib/dashboard-types.ts:
```ts
// Tipe status sesuai PRD Poin 2.D & 2.E
export type TPFStatus = 'none' | 'waiting' | 'process' | 'done' | 'revision';
export type RegistrationStatus = 'draft' | 'waiting_partner' | 'valid' | 'unpaid' | 'paid';

export interface PlayerDashboardData {
  athleteCode: string;
  communityCode: string | null; // Null jika belum join
  profileCompleteness: number; // 0 - 100
  tpfStatus: TPFStatus;
  tpfResult?: {
    level: string;
    tier: number;
    notes?: string;
  };
  registrationStatus: RegistrationStatus;
  nextMatch?: {
    opponent: string;
    time: string;
    court: string;
  };
  notifications: Array<{
    id: number;
    type: 'system' | 'alert' | 'info';
    message: string;
    timestamp: string;
    isCritical?: boolean;
  }>;
  history: Array<{
    id: number;
    event: string;
    date: string;
    category: string;
    result: string;
  }>;
}

// MOCK DATA: Ubah nilai ini untuk mengetes Skenario A/B/Edge Case
export const MOCK_PLAYER_DATA: PlayerDashboardData = {
  athleteCode: "ATH-2025-00123",
  communityCode: "COM-BCD-045",
  profileCompleteness: 80, // Ubah ke 100 untuk tes hijau
  tpfStatus: "done", // Coba: 'waiting', 'revision', 'done'
  tpfResult: {
    level: "Intermediate",
    tier: 2,
    notes: "Footwork baik, perlu peningkatan power smash."
  },
  registrationStatus: "unpaid", // Coba: 'draft', 'valid', 'paid'
  nextMatch: undefined, // Isi object jika ada jadwal
  notifications: [
    { id: 1, type: 'alert', message: "Tagihan pendaftaran akan kedaluwarsa dalam 24 jam.", timestamp: "1 jam lalu", isCritical: true },
    { id: 2, type: 'system', message: "Hasil penilaian TPF telah keluar.", timestamp: "2 hari lalu" }
  ],
  history: [
    { id: 101, event: "BCC Open 2024", date: "2024", category: "MD - Beginner", result: "Quarter Final" }
  ]
};
```
- src/lib/data/role-definitions.ts:
```ts
export const ROLE_DEFINITIONS = {
  TVT: {
    title: "Tim Verifikasi Teknis (TVT)",
    menimbang: "Bahwa untuk menjamin integritas kompetisi, penerapan asas Fair Play, dan pencegahan manipulasi level kemampuan (sandbagging) dalam turnamen BCC 2026.",
    // JOB DESC: Apa yang dikerjakan (Bab 3: Tim Verifikasi Teknis)
    jobDescriptions: [
      "Melakukan audit teknis terhadap video gameplay peserta (Verifikasi Pra-Event).",
      "Melakukan pemantauan langsung (Spot Check) di lapangan untuk identifikasi manipulasi level.",
      "Melakukan investigasi atas laporan protes terkait dugaan pemalsuan data/joki.",
      "Memberikan rekomendasi sanksi atau diskualifikasi kepada Referee."
    ],
    // SOP: Aturan main / Protokol (Bab 2: Syarat Khusus & Bab 1: KPI)
    sops: [
      "Wajib bersikap objektif, berani, dan tidak mudah diintimidasi.",
      "Dilarang memiliki konflik kepentingan (tidak sedang bermain/melatih tim peserta yang diverifikasi).",
      "Penegakan aturan verifikasi dilakukan tanpa pandang bulu (Zero Tolerance on Fraud).",
      "Laporan temuan wajib disertai bukti visual/data konkret sebelum rekomendasi diskualifikasi."
    ]
  },
  MEDIS: {
    title: "Tim Medis & Kesehatan",
    menimbang: "Bahwa untuk menjamin keselamatan jiwa dan penanganan cedera cepat selama berlangsungnya kegiatan BCC 2026.",
    // JOB DESC (Bab 3: Medis)
    jobDescriptions: [
      "Memberikan pertolongan pertama (First Aid/CPR) kepada atlet dan panitia yang cedera.",
      "Mengidentifikasi kondisi yang membutuhkan rujukan ke rumah sakit (Ambulans).",
      "Menyiapkan dan mengelola kotak P3K serta peralatan medis darurat di venue.",
      "Menyusun laporan medis harian untuk Project Director."
    ],
    // SOP (Bab 1: KPI & Bab 3: Kepatuhan)
    sops: [
      "Wajib mencapai respon time penanganan cedera di bawah 30 detik (Safety First).",
      "Tenang menghadapi darah/trauma dan bekerja secara cekatan.",
      "Memastikan protokol kesehatan dan keselamatan (K3) diterapkan di area venue.",
      "Keputusan 'Fit to Play' dari Tim Medis bersifat mutlak demi keselamatan atlet."
    ]
  },
  KEAMANAN: {
    title: "Keamanan (Security) & Gate Control",
    menimbang: "Bahwa untuk menjaga ketertiban umum, keamanan aset, serta pengaturan alur lalu lintas peserta di GOR KONI Bandung.",
    // JOB DESC (Bab 3: Keamanan & Gate)
    jobDescriptions: [
      "Mengatur akses masuk/keluar atlet, panitia, dan penonton (Gate Control).",
      "Memastikan hanya pihak berwenang yang masuk ke area terbatas (Restricted Area).",
      "Menjaga ketertiban di tribun dan area lapangan dari potensi kericuhan.",
      "Melakukan tindakan evakuasi jika terjadi keadaan darurat."
    ],
    // SOP (Bab 2: Kompetensi & Bab 3: Pengawasan)
    sops: [
      "Wajib bersikap tegas namun humanis dalam menertibkan penonton.",
      "Melakukan pemeriksaan (screening) tiket/ID Card pada setiap orang yang masuk tanpa terkecuali.",
      "Dilarang meninggalkan pos jaga sebelum ada pergantian shift atau instruksi Koordinator.",
      "Segera melapor ke Koordinator jika terjadi eskalasi konflik fisik."
    ]
  },
  MATCH_CONTROL: {
    title: "Match Control & Referee",
    menimbang: "Bahwa untuk memastikan jalannya pertandingan yang adil, tepat waktu, dan sesuai regulasi BWF/PBSI.",
    // JOB DESC (Bab 3: Koordinator Pertandingan)
    jobDescriptions: [
      "Menyusun dan mengawasi jadwal pertandingan (Match Schedule).",
      "Menangani pelanggaran teknis dan sengketa selama pertandingan (Dispute).",
      "Mengatur distribusi wasit dan hakim garis sesuai jadwal.",
      "Memastikan input skor ke sistem digital berjalan real-time."
    ],
    // SOP (Bab 1: KPI & Bab 2: Kompetensi)
    sops: [
      "Wajib menerapkan prinsip 'Zero Delay' dalam sistem pemanggilan pemain (Rolling).",
      "Keputusan Referee bersifat final dan mengikat di lapangan.",
      "Wajib memiliki pemahaman mutlak terhadap Laws of Badminton BWF.",
      "Menjaga netralitas dan tidak berpihak kepada tim manapun."
    ]
  }
};
```
- src/lib/data/sop-templates.ts:
```ts
export const SOP_TEMPLATES = {
  TPF: {
    roleName: "Tim Verifikasi Teknis (TVT)",
    menimbang: "Bahwa untuk menjamin integritas kompetisi, penerapan asas Fair Play, dan pencegahan manipulasi level kemampuan (sandbagging) dalam turnamen Badmintour Open #1, dipandang perlu untuk menugaskan Tim Verifikasi yang kompeten dan independen.",
    tugas: [
      "Melakukan audit teknis terhadap video gameplay peserta (Verifikasi Pra-Event).",
      "Melakukan pengawasan lapangan (Spot Check) untuk identifikasi manipulasi level.",
      "Melakukan investigasi atas laporan protes manajer tim terkait dugaan joki.",
      "Memberikan rekomendasi sanksi atau diskualifikasi kepada Referee.",
      "Melaporkan temuan lapangan secara berkala kepada Koordinator Pertandingan."
    ]
  },
  MEDIS: {
    roleName: "Tim Medis & Kesehatan",
    menimbang: "Bahwa untuk menjamin keselamatan jiwa, penanganan cedera cepat (response time <30 detik), dan penerapan protokol kesehatan selama berlangsungnya kegiatan Badmintour Open #1.",
    tugas: [
      "Memberikan pertolongan pertama (First Aid/CPR) kepada atlet dan panitia.",
      "Mengelola posko kesehatan dan jalur evakuasi darurat (Ambulans).",
      "Memutuskan kelayakan medis pemain untuk melanjutkan pertandingan (Fit to Play).",
      "Menyusun laporan insiden medis harian untuk Project Director."
    ]
  },
  KEAMANAN: {
    roleName: "Keamanan & Gate Control",
    menimbang: "Bahwa untuk menjaga ketertiban umum, keamanan aset, serta pengaturan alur lalu lintas peserta dan penonton di area GOR KONI Bandung demi kelancaran acara.",
    tugas: [
      "Melakukan screening tiket (Gate Check-in) dan validasi akses masuk.",
      "Mengamankan area terbatas (VVIP, Ruang Ganti, Field of Play).",
      "Melakukan tindakan preventif dan persuasif terhadap potensi kericuhan.",
      "Berkoordinasi dengan pihak kepolisian jika terjadi eskalasi keamanan."
    ]
  },
  UMPIRE: {
    roleName: "Wasit (Umpire) & Hakim Garis",
    menimbang: "Bahwa untuk memastikan jalannya pertandingan yang adil, objektif, dan sesuai dengan peraturan BWF (Laws of Badminton) serta regulasi teknis Badmintour Open #1.",
    tugas: [
      "Memimpin jalannya pertandingan di lapangan sesuai jadwal.",
      "Mengambil keputusan mutlak atas poin, fault, dan let.",
      "Menandatangani berita acara hasil pertandingan (Score Sheet).",
      "Menjaga wibawa dan netralitas perangkat pertandingan."
    ]
  }
};
```
- src/lib/finance-rules.ts:
```ts
import { SystemRole } from "@/lib/schemas/finance";

/**
 * Menentukan siapa SIGNER yang valid untuk mencegah konflik kepentingan.
 * Mengimplementasikan aturan "Cross-Authorization".
 */
export function getRequiredSigner(requesterRole: SystemRole): SystemRole {
  // ATURAN 1: Jika yang minta PROJECT DIRECTOR (misal untuk IT), 
  // maka yang harus ACC adalah SEKRETARIS.
  if (requesterRole === SystemRole.PROJECT_DIRECTOR) {
    return SystemRole.SECRETARY;
  }

  // ATURAN 2: Jika yang minta SEKRETARIS (misal untuk Acara),
  // maka yang harus ACC adalah PROJECT DIRECTOR.
  if (requesterRole === SystemRole.SECRETARY) {
    return SystemRole.PROJECT_DIRECTOR;
  }

  // ATURAN 3: Default (Divisi lain), yang ACC adalah PROJECT DIRECTOR.
  return SystemRole.PROJECT_DIRECTOR;
}

/**
 * Cek apakah User yang sedang login berhak melakukan Approval
 */
export function canUserApprove(
  currentUserRole: SystemRole, 
  requesterRole: SystemRole
): boolean {
  const requiredSigner = getRequiredSigner(requesterRole);
  return currentUserRole === requiredSigner;
}
```
- src/lib/game-logic.ts:
```ts
// src/lib/game-logic.ts

export type PlayerLevel = 'Beginner';
export type CompetitionCategory = 'Beginner';

interface ValidationResult {
  isValid: boolean;
  category?: CompetitionCategory;
  pricePerPerson?: number; // Harga per orang
  reason?: string;
}

// Harga berdasarkan KATEGORI AKHIR (bukan level individu)
const PRICE_LIST = {
  Beginner: 100000,     // 100k per orang
};

export function validateIndividualRegistration(level: PlayerLevel): ValidationResult {
  const category: CompetitionCategory = 'Beginner';

  const basePrice = PRICE_LIST[category];
  return {
    isValid: true,
    category: category,
    pricePerPerson: basePrice,
  };
}

// Helper untuk Generate Code (Bisa ditaruh di utils)
export function generateUniqueCode(prefix: 'ATH' | 'COM' = 'ATH'): string {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${random}`;
}
// Feature 6: Swap Player Logic Validator
export function calculateSwapCostDiff(
  oldCategory: CompetitionCategory, 
  newPartnerLevel: PlayerLevel, 
  currentUserLevel: PlayerLevel
): { allowed: boolean, priceDiff: number, newCategory?: CompetitionCategory, message?: string } {
  
  const validation = validateIndividualRegistration(newPartnerLevel);
  
  if (!validation.isValid) {
      return { allowed: false, priceDiff: 0, message: validation.reason };
  }

  const newCategory = validation.category!;
  const oldPrice = PRICE_LIST[oldCategory];
  const newPrice = PRICE_LIST[newCategory];

  // Aturan: Tidak ada refund jika turun level, tapi harus bayar jika naik level.
  const diff = Math.max(0, newPrice - oldPrice); 

  return {
      allowed: true,
      priceDiff: diff,
      newCategory: newCategory,
      message: diff > 0 
        ? `Upgrade Kategori: Anda perlu menambah Rp ${diff.toLocaleString()}.` 
        : `Downgrade/Same Kategori: Tidak ada biaya tambahan (No Refund).`
  };
}

// Feature 7: Mock NIK Validation (Gunakan di Server Action Registration)
export async function isNikUnique(nik: string): Promise<boolean> {
    // Simulasi DB Check
    // const existing = await db.user.findFirst({ where: { nik } });
    const mockExistingNIKS = ["1234567890", "0987654321"];
    return !mockExistingNIKS.includes(nik);
}
```
- src/lib/matrix-validation.ts:
```ts
// Definisi Tipe untuk Level dan Tier
export type PlayerLevel = 'Beginner';
export type PlayerTier = 1 | 2 | 3 | 4; // 1 = Tertinggi, 4 = Terendah

interface PlayerProfile {
  id: string;
  name: string;
  level: PlayerLevel;
  tier: PlayerTier;
  communityCode?: string; // Tambahkan communityCode
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
  allowedCategory?: string;
}

/**
 * MATRIKS ATURAN (Contoh Logika Sporty/Kompetitif)
 * - Only Beginners can register.
 */
export function validateIndividualRegistration(
  p1: PlayerProfile, 
  mode: 'independent' | 'community' = 'independent' // Tambahkan parameter mode
): ValidationResult {
  
  // 1. Validasi SOP 4.3: Cek Kelengkapan Data TPF (Asumsi level ada jika profil ada)
  if (!p1.level) {
    return { isValid: false, message: "Pemain belum dinilai oleh TPF (SOP 4.3)." };
  }

  // 3. Validasi SOP 4.5: Matriks Level-Tier
  if (p1.level === 'Beginner') {
     return {
        isValid: true,
        message: "Pemain Valid! Siap mendominasi lapangan.",
        allowedCategory: "Beginner Open"
      };
  }

  return {
      isValid: false,
      message: "Hanya pemain Beginner yang diizinkan mendaftar."
  };
}

export function validatePairing(
  p1: PlayerProfile, 
  p2: PlayerProfile, 
  mode: 'independent' | 'community' = 'independent' // Tambahkan parameter mode
): ValidationResult {
  
  // 1. Validasi SOP 4.3: Cek Kelengkapan Data TPF
  if (!p1.level || !p2.level) {
    return { isValid: false, message: "Salah satu pemain belum dinilai oleh TPF (SOP 4.3)." };
  }

  // 2. Validasi SOP 4.4.B: Cek Kesamaan Komunitas (KHUSUS MODE KOMUNITAS)
  if (mode === 'community') {
    if (!p1.communityCode || !p2.communityCode || p1.communityCode !== p2.communityCode) {
      return { 
        valid: false, 
        message: "Dalam Mode Komunitas, kedua pemain wajib berasal dari kode komunitas yang sama (SOP 4.4.B)." 
      };
    }
  }

  // 3. Validasi SOP 4.5: Matriks Level-Tier
  if (p1.level === 'Beginner' && p2.level === 'Beginner') {
      return {
        isValid: true,
        message: "Pasangan Valid! Siap mendominasi lapangan.",
        allowedCategory: "Beginner Open"
      };
  }

  return {
      isValid: false,
      message: "Hanya pemain Beginner yang diizinkan berpasangan."
  };
}
```
- src/lib/schemas/athlete.ts:
```ts
import { z } from "zod";

export const athleteRegistrationSchema = z.object({
  // A. Data Pribadi
  fullName: z.string().min(3, "Nama lengkap minimal 3 karakter."),
  nickname: z.string().min(2, "Nama panggilan minimal 2 karakter."),
  pob: z.string().min(3, "Tempat lahir wajib diisi."),
  dob: z.string().min(1, "Tanggal lahir wajib diisi."),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin." }),
  dominantHand: z.enum(["Kanan", "Kiri"], { required_error: "Pilih tangan dominan." }),
  phone: z.string().min(10, "Nomor HP tidak valid.").regex(/^\d+$/, "Hanya angka."),
  email: z.string().email("Format email tidak valid."),
  address: z.string().min(10, "Alamat wajib diisi."),
  schoolOrWork: z.string().min(3, "Sekolah/Pekerjaan wajib diisi."),
  guardianName: z.string().optional(),
  emergencyContact: z.string().min(10, "Kontak darurat tidak valid.").regex(/^\d+$/, "Hanya angka."),
  
  // B. Status Kepelatihan
  category: z.enum(["Pra-usia dini", "Usia dini", "Anak", "Remaja", "Dewasa", "Veteran"], { required_error: "Pilih kategori usia." }),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Elite"], { required_error: "Pilih level atlet." }),
  pbsiNumber: z.string().optional(),
  startYear: z.string().length(4, "Tahun harus 4 digit.").regex(/^\d+$/, "Tahun hanya boleh angka."),
  careerTarget: z.enum(["Rekreasi", "Prestasi", "Profesional"], { required_error: "Pilih target karier." })
});

export type AthleteRegistrationFormValues = z.infer<typeof athleteRegistrationSchema>;
```
- src/lib/schemas/committee.ts:
```ts
import { z } from "zod";

// Skema data untuk satu anggota panitia
export const committeeMemberSchema = z.object({
  id: z.string().optional(), // ID akan digenerate
  name: z.string().min(2, "Nama wajib diisi."),
  email: z.string().email("Email tidak valid.").optional().or(z.literal('')),
  phone: z.string().min(10, "Nomor telepon tidak valid.").optional().or(z.literal('')),
  expertise: z.string().optional(), // Keahlian utama (jabatan)
  photoUrl: z.string().url("URL tidak valid").optional().or(z.literal('')), // URL foto profil
  
  // --- Fields from Volunteer Form ---
  education: z.string().optional(),
  status: z.string().optional(),
  division1: z.string().optional(),
  division2: z.string().optional(),
  reason: z.string().optional(), // Alasan bergabung / Motivasi
  role: z.string().optional(),
  isProfileCompleted: z.boolean().optional(),
});

export type CommitteeMember = z.infer<typeof committeeMemberSchema>;
```
- src/lib/schemas/finance.ts:
```ts
import { z } from "zod";

// Mapping Role sesuai SK
export enum SystemRole {
  PROJECT_DIRECTOR = "PROJECT_DIRECTOR", // The Signer 1
  SECRETARY = "SECRETARY",             // The Signer 2 (Cross-Auth)
  TREASURER = "TREASURER",             // The Checker
  LEGAL = "LEGAL",                     // Legal Validator
  ADVISOR = "ADVISOR",                 // Penasihat (Variance Alert)
  DIVISION_COORD = "DIVISION_COORD"    // The Maker
}

// Status Transaksi
export enum TransactionStatus {
  DRAFT = "DRAFT",
  WAITING_LEGAL = "WAITING_LEGAL",     // Jika ada kontrak
  WAITING_CHECKER = "WAITING_CHECKER", // Menunggu Bendahara
  WAITING_SIGNER = "WAITING_SIGNER",   // Menunggu PD/Sekretaris
  APPROVED = "APPROVED",               // Siap Cair
  PAID = "PAID",                       // Sudah Transfer
  REJECTED = "REJECTED"
}

// Skema Pengajuan Dana (Disbursement)
export const disbursementSchema = z.object({
  id: z.string(),
  requesterRole: z.nativeEnum(SystemRole), // Siapa yang minta?
  divisionId: z.string(),                  // Pos Anggaran mana?
  amount: z.number().min(1, "Nominal tidak boleh 0"),
  description: z.string(),
  isContractual: z.boolean(),              // Apakah butuh review Legal?
  status: z.nativeEnum(TransactionStatus),
  
  // Audit Trail (Siapa yang melakukan apa)
  legalApprovedBy: z.string().optional(),
  checkerApprovedBy: z.string().optional(), // Bendahara
  signerApprovedBy: z.string().optional(),  // PD atau Sekretaris
});

export type DisbursementRequest = z.infer<typeof disbursementSchema>;
```
- src/lib/schemas/lineup.ts:
```ts
import { z } from "zod";

export const lineupSchema = z.object({
  category: z.enum(["Beregu PUTRA", "Beregu PUTRI", "Beregu CAMPURAN"], {
    required_error: "Pilih kategori pertandingan",
  }),
  round: z.enum(["Penyisihan Grup", "Gugur (Knockout)"], {
    required_error: "Pilih babak",
  }),
  date: z.string().min(1, "Tanggal wajib diisi"),
  court: z.string().min(1, "No. Lapangan wajib diisi"),
  time: z.string().min(1, "Jam main wajib diisi"),
  opponent: z.string().min(2, "Nama lawan wajib diisi"),
  
  // Data Pemain per Partai (1-5)
  // Kita gunakan array fix 5 elemen
  matches: z.array(
    z.object({
      matchLabel: z.string(), // Label Partai (misal: Ganda Beginner 1)
      player1: z.string().min(2, "Pemain 1 wajib diisi"),
      player2: z.string().min(2, "Pemain 2 wajib diisi"),
      player3: z.string().optional(), // Khusus 3-on-3
    })
  ).length(5),

  managerSign: z.literal(true, { errorMap: () => ({ message: "Anda wajib menyetujui pernyataan manajer." }) }),
});

export type LineupFormValues = z.infer<typeof lineupSchema>;
```
- src/lib/schemas/protest.ts:
```ts
import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];

export const protestFormSchema = z.object({
  managerName: z.string().min(2, "Nama manajer wajib diisi"),
  teamName: z.string().min(2, "Nama tim pelapor wajib diisi"),
  managerWhatsapp: z.string().min(10, "Nomor WhatsApp wajib diisi"),
  category: z.enum(["Putra", "Putri", "Campuran"], { required_error: "Pilih kategori" }),
  
  // Detail Kejadian
  incidentTime: z.string().min(1, "Waktu kejadian wajib diisi"),
  courtNumber: z.string().min(1, "Nomor lapangan wajib diisi"),
  partaiNumber: z.coerce.number({invalid_type_error: "Partai harus berupa angka"}).min(1, "Partai ke- wajib diisi"),
  opponentTeam: z.string().min(2, "Nama tim lawan wajib diisi").regex(/^[A-Za-z\s]+$/, "Nama tim hanya boleh berisi huruf dan spasi"),
  opponentPlayer: z.string().min(2, "Nama pemain lawan wajib diisi").regex(/^[A-Za-z\s]+$/, "Nama pemain hanya boleh berisi huruf dan spasi"),

  // Jenis Pelanggaran (Minimal 1 dipilih)
  violationType: z.array(z.string()).min(1, "Wajib memilih minimal satu jenis pelanggaran"),

  // Bukti Tambahan
  youtubeUrl: z.string().url("URL YouTube tidak valid.").optional().or(z.literal('')),
  videoFile: z.any()
    .optional()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Ukuran video maksimal 100MB.`)
    .refine(
      (files) => !files || files.length === 0 || ACCEPTED_VIDEO_TYPES.includes(files?.[0]?.type),
      "Format video harus .mp4, .webm, atau .mov"
    ),
  additionalEvidence: z.string().optional(),

  // Pernyataan Uang Jaminan
  depositAgreement: z.literal(true, { 
    errorMap: () => ({ message: "Persetujuan jaminan Rp 500.000 wajib dicentang." }) 
  }),
});

export type ProtestFormValues = z.infer<typeof protestFormSchema>;
```
- src/lib/schemas/recruitment.ts:
```ts
import { z } from "zod";

export const DIVISIONS = [
  "MATCH CONTROL (Skor, Wasit, Jadwal)",
  "GATE KEEPER (Keamanan & Ticketing)",
  "LOGISTIK & RUNNER (Perlengkapan)",
  "MEDIA & DOKUMENTASI (Konten Kreatif)",
  "LIAISON OFFICER (LO - Tamu VIP)",
  "MEDIS & KEBERSIHAN (P3K)",
  "SPONSORSHIP & FUNDRAISING"
] as const;

export const recruitmentSchema = z.object({
  // BAGIAN 1: DATA PRIBADI
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nickname: z.string().min(2, "Nama panggilan wajib diisi"),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin" }),
  dob: z.string().min(1, "Tanggal lahir wajib diisi"), // Input type='date' returns string YYYY-MM-DD
  whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid").regex(/^\d+$/, "Hanya angka"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat domisili lengkap wajib diisi"),
  instagram: z.string().min(2, "Instagram wajib diisi"),
  
  // BAGIAN 2: LATAR BELAKANG
  education: z.string({ required_error: "Pilih pendidikan terakhir" }),
  status: z.string({ required_error: "Pilih status saat ini" }),
  major: z.string().min(2, "Jurusan/Bidang pekerjaan wajib diisi"),

  // BAGIAN 3: DIVISI
  division1: z.string({ required_error: "Pilih prioritas 1" }),
  division2: z.string({ required_error: "Pilih prioritas 2" }),

  // BAGIAN 4: KEAHLIAN
  hasExperience: z.enum(["Ya", "Tidak"], { required_error: "Pilih status pengalaman" }),
  experienceDetail: z.string().optional(),
  skills: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),

  // BAGIAN 5: KOMITMEN
  availability: z.array(z.string()).min(1, "Wajib memilih ketersediaan"),
  attendBriefing: z.enum(["Ya", "Tidak"], { required_error: "Wajib hadir briefing" }),
  shirtSize: z.string({ required_error: "Pilih ukuran baju" }),

  // BAGIAN 6: STUDI KASUS (Lebih detail untuk panitia)
  caseStudy1: z.string().min(50, "Jawaban terlalu singkat. Jelaskan analisa Anda (min 50 karakter)."),
  caseStudy2: z.string().min(50, "Solusi konkret Anda..."),

  // PERNYATAAN
  agreeData: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),
  agreeRules: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),
  agreeCompetitive: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),
}).refine((data) => data.division1 !== data.division2, {
  message: "Divisi Cadangan tidak boleh sama dengan Utama",
  path: ["division2"],
});

export type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;
```
- src/lib/schemas/registration.ts:
```ts
import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(3, "Nama terlalu pendek"),
  nik: z.string()
    .length(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh angka"),
  email: z.string().email(),
});

export const teamRegistrationSchema = z.object({
  entityName: z.string().min(3, "Nama komunitas minimal 3 karakter"),
  officialLocation: z.string().min(3, "Lokasi minimal 3 karakter"),
  contactPerson: z.string().min(3, "Nama manajer minimal 3 karakter"),
  phoneNumber: z.string().min(10, "Nomor HP minimal 10 digit").regex(/^\d+$/, "Nomor HP hanya boleh angka"),
  category: z.enum(["Beginner"], {
    required_error: "Pilih kategori pertandingan",
  }),
});

export type TeamRegistrationFormValues = z.infer<typeof teamRegistrationSchema>;
// Note: Validasi unique DB biasanya dilakukan manual di Server Action, bukan di Zod schema client-side murni.
```
- src/lib/schemas/volunteer.ts:
```ts
import { z } from "zod";

export const VOLUNTEER_DIVISIONS = [
  "MATCH CONTROL (Skor, Wasit, Jadwal)",
  "GATE KEEPER (Keamanan & Ticketing)",
  "MEDIS & FISIO: P3K lapangan, bantu terapis.",
  "MEDIA & KREATIF: Foto, video reels, liputan story.",
  "LOGISTIK & RUNNER: Mobilitas tinggi, angkat barang.",
  "LIAISON OFFICER (LO - Tamu VIP)",
  "SPONSORSHIP & FUNDRAISING"
] as const;

export const volunteerSchema = z.object({
  // BAGIAN 1: DATA PRIBADI
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  nickname: z.string().min(2, "Nama panggilan wajib diisi"),
  gender: z.enum(["Laki-laki", "Perempuan"], { required_error: "Pilih jenis kelamin" }),
  dob: z.string().min(1, "Tanggal lahir wajib diisi"), // Input type='date' returns string YYYY-MM-DD
  whatsapp: z.string().min(10, "Nomor WhatsApp minimal 10 digit").regex(/^\d+$/, "Hanya angka"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(5, "Alamat domisili wajib diisi"),
  instagram: z.string().min(2, "Instagram wajib diisi (tanpa @ boleh)"),
  shirtSize: z.enum(["S", "M", "L", "XL", "XXL", "XXXL"], { required_error: "Pilih ukuran baju" }),

  // BAGIAN 2: LATAR BELAKANG
  education: z.string({ required_error: "Pilih pendidikan terakhir" }),
  institution: z.string().min(2, "Nama institusi wajib diisi"),
  major: z.string().min(2, "Jurusan wajib diisi"),
  status: z.string({ required_error: "Pilih status saat ini" }), // Radio group value
  expertise: z.string().min(3, "Keahlian wajib diisi"),

  // BAGIAN 3: POSISI
  division1: z.string({ required_error: "Pilih divisi prioritas 1" }),
  division2: z.string({ required_error: "Pilih divisi prioritas 2" }),

  // BAGIAN 4: PENGALAMAN & ASET
  experience: z.string().min(10, "Ceritakan pengalaman minimal 1 kalimat panjang"),
  skills: z.array(z.string()).optional(),
  hasVehicle: z.enum(["Ya", "Tidak"], { required_error: "Info kendaraan wajib" }),
  hasLaptop: z.enum(["Ya", "Tidak"], { required_error: "Info laptop wajib" }),

  // BAGIAN 5: KOMITMEN
  // Form mengirim array string, jadi schema harus array
  availability: z.array(z.string()).min(1, "Pilih minimal 1 tanggal ketersediaan"),
  
  // BAGIAN 6: STUDI KASUS
  caseStudy1: z.string().min(20, "Jawaban terlalu pendek, berikan detail tindakan Anda."),
  caseStudy2: z.string().min(20, "Solusi konkret Anda."),

  // PERNYATAAN
  agreeData: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),
  agreeRules: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),
  agreeCompetitive: z.literal(true, { errorMap: () => ({ message: "Wajib disetujui" }) }),

}).refine((data) => data.division1 !== data.division2, {
  message: "Pilihan Divisi 2 tidak boleh sama dengan Divisi 1",
  path: ["division2"],
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;
```
- src/lib/tpf-data.ts:
```ts
// src/lib/tpf-data.ts

// I. PANDUAN VISUAL RUBRIK
export const RUBRIC_GUIDELINES = [
  {
    title: '1. BIOMEKANIK & GRIP (Teknik Dasar Pukulan)',
    description: 'Fokus: Lihat pergelangan tangan dan cara memegang raket saat bola di atas kepala.',
    scores: [
      { score: 1, name: 'Grip Panci / Gebug Kasur', desc: 'Memegang raket seperti memegang palu atau gagang panci (V-shape tidak ada). Muka raket menghadap net terus. Gerakan seperti menggebug kasur (kaku dari bahu). Suara sering "bletak" (kena frame).' },
      { score: 2, name: 'Kaku & Berat', desc: 'Sudah mencoba grip salaman (V-grip), tapi jari menggenggam terlalu erat/tegang. Pergelangan tangan (wrist) terkunci mati. Bola melaju tapi terasa berat.' },
      { score: 3, name: 'Standar Komunitas', desc: 'Cara pegang benar (relatif santai). Sudah ada gerakan memutar lengan bawah (pronation). Bunyi pukulan cukup bersih ("Bug!").' },
      { score: 4, name: 'Luwes / Fluid', desc: 'Gerakan ayunan terlihat enak dan mengalir. Transisi grip cepat dan otomatis tanpa melihat raket. Power pukulan besar meski ayunan tidak ngoyo.' },
      { score: 5, name: 'Matang / Finger Power', desc: 'Memegang raket hanya dengan jari (ada rongga di telapak). Ayunan pendek tapi eksplosif (Snap). Suara pukulan sangat nyaring dan tajam. Terlihat sangat santai (effortless).' }
    ]
  },
  {
    title: '2. FOOTWORK (Pergerakan Kaki)',
    description: 'Fokus: Lihat langkah kaki saat mengejar bola yang jauh dari badan.',
    scores: [
      { score: 1, name: 'Patung / Tanam Padi', desc: 'Kaki seperti dipaku di lantai, malas bergerak. Menunggu bola datang ke badan atau hanya menjulurkan tangan.' },
      { score: 2, name: 'Lari Jogging / Langkah Berat', desc: 'Bunyi langkah kaki keras ("Gedebuk"). Mengejar bola dengan lari biasa, bukan langkah badminton. Sering terlambat.' },
      { score: 3, name: 'Langkah Geser / Chassé', desc: 'Bergerak dengan cara menyeret/menggeser kaki (chassé step). Ada usaha untuk kembali ke tengah lapangan (recovery).' },
      { score: 4, name: 'Lincah / Jinjit', desc: 'Tumit jarang menyentuh lantai (jinjit). Reaksi cepat mengubah arah. Keseimbangan tubuh bagus, jarang sempoyongan.' },
      { score: 5, name: 'Split Step / Kancil', desc: 'Ada lompatan kecil (hop) saat lawan memukul. Langkah gunting (scissor jump) saat smash. Langkah sangat efisien (1-2 langkah sudah sampai pojok).' }
    ]
  },
  {
    title: '3. BACKHAND OVERHEAD (Sisi Kiri Belakang)',
    description: 'Fokus: Lihat saat pemain ditekan ke arah pojok kiri belakangnya.',
    scores: [
      { score: 1, name: 'Mati Kutu / Titik Lemah', desc: 'Panik total. Lari memutar badan memaksa pakai forehand tapi telat. Bola sering tidak sampai net.' },
      { score: 2, name: 'Asal Nyebrang / Tanggung', desc: 'Memukul dengan punggung menghadap net, tapi tenaga tidak ada. Bola melambung tanggung di tengah lapangan.' },
      { score: 3, name: 'Aman / Lob Tengah', desc: 'Tenaga cukup. Bisa membuang bola lob tinggi atau drop ke tengah lapangan lawan. Permainan berlanjut.' },
      { score: 4, name: 'Lob Sampai Belakang / Clear', desc: 'Teknik ayunan backhand benar (siku naik dulu). Bola melambung tinggi dan jatuh di area garis belakang lawan.' },
      { score: 5, name: 'Istimewa / Silang & Smash', desc: 'Sangat percaya diri. Bisa melakukan backhand clear silang (cross) dari ujung ke ujung. Atau bisa melakukan backhand drop/smash yang menipu.' }
    ]
  },
  {
    title: '4. ATTACK (Kualitas Serangan / Smash)',
    description: 'Fokus: Lihat lintasan bola saat pemain melakukan smash.',
    scores: [
      { score: 1, name: 'Nyangkut / Out', desc: 'Tidak ada timing. Bola sering melambung keluar garis atau menancap di net. Pukulan tidak ada tenaga.' },
      { score: 2, name: 'Datar / Modal Otot', desc: 'Mengandalkan otot lengan/bahu. Bola kencang tapi datar (Flat/Drive). Tidak menukik, mudah diblok.' },
      { score: 3, name: 'Nukik Standar', desc: 'Power sedang. Bola turun ke bawah (menukik) dengan kecepatan wajar. Standar smash bapak-bapak.' },
      { score: 4, name: 'Tajam & Keras', desc: 'Kombinasi sudut curam dan kecepatan tinggi. Bola jatuh tajam di area depan garis servis ganda. Sering mematikan lawan.' },
      { score: 5, name: 'Akurasi & Variasi', desc: 'Tidak asal keras, tapi diarahkan ke garis pinggir atau badan lawan. Menguasai Stick Smash (smash kedut).' }
    ]
  },
  {
    title: '5. DEFENSE (Pertahanan)',
    description: 'Fokus: Lihat reaksi pemain saat menerima smash keras.',
    scores: [
      { score: 1, name: 'Takut Bola / Buang Muka', desc: 'Membalikkan badan atau membuang muka. Mengangkat raket asal-asalan.' },
      { score: 2, name: 'Nanggung / Umpan', desc: 'Raket diam di bawah lutut. Bola terkena raket tapi melambung tanggung di depan net.' },
      { score: 3, name: 'Angkat Bola / Lift', desc: 'Posisi siap (kuda-kuda). Mampu menangkis smash dengan melambungkan bola tinggi ke belakang (Lift).' },
      { score: 4, name: 'Tembok / Wall', desc: 'Sangat tenang. Bisa mengarahkan blok ke kiri atau kanan (ruang kosong), bukan cuma lurus ke pengirim smash.' },
      { score: 5, name: 'Counter Attack / Balik Serang', desc: 'Agresif. Tidak melambungkan bola, tapi membalikkan dengan Drive datar kencang atau Netting silang tipis.' }
    ]
  },
  {
    title: '6. GAME IQ (Rotasi & Taktik Ganda)',
    description: 'Fokus: Lihat pergerakan pemain tanpa bola (posisi).',
    scores: [
      { score: 1, name: 'Tabrakan / Rebutan', desc: 'Sering bingung bola milik siapa. Raket sering beradu dengan partner. Dua-duanya diam melihat bola jatuh di tengah.' },
      { score: 2, name: 'Statis / Paku', desc: 'Diam di posisi masing-masing. Satu di depan terus, satu di belakang terus, tidak peduli kondisi permainan.' },
      { score: 3, name: 'Paham Dasar', desc: 'Rotasi standar jalan. Serang = depan-belakang. Bertahan = kiri-kanan. Komunikasi aktif.' },
      { score: 4, name: 'Saling Cover / Kompak', desc: 'Otomatis bergerak menutup ruang kosong saat partner ditarik keluar posisi. Jarang ada area kosong.' },
      { score: 5, name: 'Antisipasi / Reading', desc: 'Seperti peramal. Bisa menebak arah bola lawan sebelum dipukul. Sering memotong bola (Intercept) di depan net.' }
    ]
  },
  {
    title: '7. PHYSIQUE (Fisik & Stamina)',
    description: 'Fokus: Lihat konsistensi gerakan dari awal sampai akhir video.',
    scores: [
      { score: 1, name: 'Ngos-ngosan / Pucat', desc: 'Baru main sebentar napas sudah memburu. Sering bertumpu tangan di lutut saat bola mati.' },
      { score: 2, name: 'Habis Bensin', desc: 'Awal main gesit, tapi setelah 5 menit gerakan kaki melambat drastis. Sering mati sendiri karena lelah.' },
      { score: 3, name: 'Stabil', desc: 'Kuat bermain tempo sedang. Napas teratur. Tidak banyak kesalahan konyol karena lelah.' },
      { score: 4, name: 'Prima / Athlete-like', desc: 'Fisik terlatih. Masih bisa sprint di poin kritis. Recovery napas sangat cepat saat jeda.' },
      { score: 5, name: 'Monster / Badak', desc: 'Stamina tidak habis-habis. Bermain dengan tempo cepat (high pace) terus menerus tanpa kendor.' }
    ]
  }
];

// II. PETUNJUK TEKNIS PENILAIAN
export const ASSESSMENT_METHODS = [
  {
    title: "I. METODE PENILAIAN VIA VIDEO (PRA-TURNAMEN)",
    description: "Tantangan: Video bisa diedit, lawan mungkin lemah, atau hanya highlight. TPF harus jeli melihat detail mikro.",
    points: [
      { subtitle: '1. TEKNIK "PAUSE & ZOOM" (Cek Biomekanik)', desc: "Lakukan Pause saat pemain mengangkat raket. Fokus pada genggaman tangan. Grip panci = Beginner. Grip miring/siku naik = Intermediate/Advance. Grip adalah hal paling sulit dimanipulasi." },
      { subtitle: '2. CEK KUALITAS LAWAN (Validasi Konteks)', desc: "Jika lawan cuma memberi bola enak (Feeding), kurangi nilai skill. Wajib video uncut (tanpa potongan) minimal 2 menit reli." },
      { subtitle: '3. AUDIO CHECK (Bunyi Pukulan)', desc: 'Besarkan volume. "Bletak" = Akurasi Buruk. "Bug/Dug" = Power Menengah. "Tring/Wush" = Advance (Sweet Spot).' },
      { subtitle: '4. FOOTWORK "TANPA BOLA"', desc: "Perhatikan subjek saat partnernya memukul. Diam menonton = Level Bawah. Ikut geser jaga ruang = Level Atas." }
    ]
  },
  {
    title: "II. METODE PENILAIAN LANGSUNG DI LAPANGAN (SAAT PERTANDINGAN)",
    description: 'Tantangan: Pemain bisa grogi, atau sebaliknya "Pura-pura Bego" (Sandbagging) agar tidak naik kelas.',
    points: [
      { subtitle: '1. PANTAU SAAT WARM-UP', desc: 'Pemain sering lupa "bersandiwara" saat pemanasan. Lihat saat mereka lob/clear. Seringkali teknik asli keluar di sini, tapi mendadak "hilang" saat skor dihitung.' },
      { subtitle: '2. TEKNIK "POIN KRITIS" (Mental Check)', desc: 'Lihat saat skor 19-19. Beginner akan panik, kaku, buang bola. Sandbagger mendadak jago. Jika skill naik drastis, tandai sebagai Advance.' },
      { subtitle: '3. POSISI BERDIRI (STANCE) SAAT DEFENSE', desc: 'Kaki rapat & raket di bawah = Beginner. Kuda-kuda & raket di perut = Intermediate. Kuda-kuda & badan condong agresif = Advance.' },
      { subtitle: '4. REAKSI "BOLA KAGET" (Refleks Alamiah)', desc: 'Refleks tidak bisa bohong. Jika tangan menyentak cepat (twitch) ke arah bola sulit, itu tanda Muscle Memory level tinggi.' }
    ]
  }
];

// III. TABEL PEMBANDING
export const COMPARISON_TABLE = [
  { indicator: "POWER", video_assessment: "Dilihat dari laju bola (cepat/lambat) di video.", field_assessment: "Dilihat dari suara ledakan senar & seberapa jauh lawan terdorong mundur." },
  { indicator: "STAMINA", video_assessment: "Sulit dinilai (karena potongan klip).", field_assessment: "Sangat jelas. Lihat napas & apakah tangan memegang lutut saat jeda." },
  { indicator: "MENTAL", video_assessment: "Tidak terlihat.", field_assessment: "Terlihat jelas saat poin kritis atau saat tertinggal jauh." },
  { indicator: "GAME IQ", video_assessment: "Lihat posisi rotasi.", field_assessment: "Lihat komunikasi dengan partner & cara mematikan lawan." },
  { indicator: "BACKHAND", video_assessment: "Lihat teknik ayunan (siku).", field_assessment: "Lihat keberanian. Apakah dia lari menghindari backhand atau menunggu backhand?" }
];

// IV. RED FLAGS
export const RED_FLAGS = [
  '"Miss" yang Tidak Wajar: Sengaja membuang bola Out jauh sekali atau servis nyangkut berkali-kali secara teatrikal (akting berlebihan).',
  'Footwork Malas tapi Sampai: Kakinya terlihat jalan santai, tapi anehnya selalu tepat posisi di mana bola jatuh (Pembacaan bola terlalu bagus untuk seorang pemula).',
  'Mata Elang: Pemain pemula biasanya ragu bola in/out. Pemain yang dengan yakin melepas bola (Watch the line) dan terbukti benar out tipis, biasanya pemain jam terbang tinggi.',
  'Gear Pro: (Indikator pendukung) Menggunakan sepatu grade turnamen mahal, raket high-end, dan cara membalut grip yang sangat rapi khas atlet.'
];
```
- src/lib/utils.ts:
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- tailwind.config.ts:
```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Outfit"', 'sans-serif'],
        headline: ['"Outfit"', 'sans-serif'],
        mono: ['"Outfit"', 'monospace'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.5rem',
        'pill': '9999px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      // ... keep existing animations ...
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
            '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
            '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```
- tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```