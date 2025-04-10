export default function HorizontalBar() {
    return (
      <div className="w-full flex h-12 rounded-full overflow-hidden">
        <div className="bg-[#2e3192] w-1/3 h-full"></div>
        <div className="bg-[#d9d9d9] w-2/3 h-full"></div>
      </div>
    )
  }