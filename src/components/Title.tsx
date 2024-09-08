export interface TitleProps {
    texts: string[]
}

export default function Title(props: TitleProps) {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500">{props.texts[0]} <span className="text-gray-700 font-medium">{props.texts[1]}</span></p>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  )
}
