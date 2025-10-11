import {cloneElement, ReactElement} from 'react'

interface SectionTitleProps {
  children: ReactElement<WithClassName>
}
interface WithClassName {
  className?: string
  // [key: string]: string;
}

const SectionTitle = ({children}: SectionTitleProps): ReactElement => {
  const baseClasses =
    'text-3xl lg:text-4xl lg:leading-tight font-semibold md:font-bold'

  return cloneElement(children, {
    className: [(children.props as WithClassName)?.className || '', baseClasses]
      .filter(Boolean)
      .join(' ')
      .trim(),
  })
}

export default SectionTitle
