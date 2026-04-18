export default function Marquee() {
  const text = 'GENERATE • APPROVE • PUBLISH • AUTOMATE • GENERATE • APPROVE • PUBLISH • AUTOMATE •'

  return (
    <div className="marq" aria-hidden="true">
      <div className="marq-track">
        <div className="marq-txt">{text.split('•').map((part, i, arr) => (
          i < arr.length - 1 ? <span key={i}>{part}<span>•</span></span> : null
        ))}</div>
        <div className="marq-txt">{text.split('•').map((part, i, arr) => (
          i < arr.length - 1 ? <span key={i}>{part}<span>•</span></span> : null
        ))}</div>
      </div>
    </div>
  )
}
