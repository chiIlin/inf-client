import React, { useState, ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionProps {
  children: ReactNode
  multiple?: boolean
}

const Accordion = ({ children }: AccordionProps) => {
  return <div className="border border-gray-200 rounded-md">{children}</div>
}

interface AccordionItemProps {
  value: string
  open?: boolean
  children: ReactNode
  className?: string
}

const AccordionItem = ({
  value,
  children,
  className,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  const childrenArray = React.Children.toArray(children)
  const trigger = childrenArray.find((child: any) =>
    child?.type?.displayName === "AccordionTrigger"
  )
  const content = childrenArray.find((child: any) =>
    child?.type?.displayName === "AccordionContent"
  )

  return (
    <div className={cn("border-b", className)}>
      {trigger &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          isOpen,
          onClick: toggleOpen,
        })}
      {content &&
        React.cloneElement(content as React.ReactElement<any>, { isOpen })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: ReactNode
  onClick?: () => void
  isOpen?: boolean
  className?: string
}

const AccordionTrigger = ({
  children,
  onClick,
  isOpen,
  className,
}: AccordionTriggerProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps {
  children: ReactNode
  isOpen?: boolean
  className?: string
}

const AccordionContent = ({
  children,
  isOpen,
  className,
}: AccordionContentProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300",
        isOpen ? "max-h-screen pb-4 pt-0" : "max-h-0"
      )}
    >
      <div className={cn(className)}>{isOpen && children}</div>
    </div>
  )
}
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
