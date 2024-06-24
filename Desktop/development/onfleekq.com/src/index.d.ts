


interface LayoutProps {
    children: ReactNode
    onSubmit?: () => void
    onClick?: () => void
    isAuth?: boolean
    label?: string
    isSidebar?: boolean
    clName?: string
}

interface SVGColorProps {
    color?: string
    height?: string | number
    width?: string | number
}


interface ButtonProps {
    className?: string
    storeIcon?: ReactNode
    name?: string
    nameSize?: string | number
    label?: string
    labelSize?: string | number
    icon?: ReactNode
    color?: string
    bgColor?: string
    border?: Property.Border<string | number> | undefined
    type?: "download" | "btn_cta" | "onfleekq" | "vendor" | "onfkq_primary" | "onfkq_secondary" | "primary" | undefined
    onClick?: () => void
}



interface HeaderStrokeProps {
    img?: string
    title?: string
    label?: string | ReactNode
    size?: string | number
    fontSize?: string | number
}

interface CardsProps {
    img: string;
    label: string;
}


interface AccordionItem  {
    number: number;
    title: string;
    subtitle: string;
    contentNumber: string;
    contentTitle: string;
    imageSrc: string;
  }


  interface TextColorProps {
    primary?: string | ReactNode
    secondary?: string | ReactNode
    className?: string | ReactNode
  }