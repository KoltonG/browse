import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Move() {
  const [hoveredBubbles, _setHoveredBubbles] = useState<number[]>([])
  const hoveredBubblesRef = useRef<number[]>(hoveredBubbles)
  function setHoveredBubbles(data) {
    hoveredBubblesRef.current = data
    _setHoveredBubbles(data)
  }

  console.log(hoveredBubbles)
  const bubble1 = useRef(null)
  const bubble2 = useRef(null)
  const bubble3 = useRef(null)
  const bubble4 = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      window.handsfree?.plugin.palmPointers.enable()
      // @ts-ignore
      document.addEventListener('handsfree-data', ({ detail: data }) => {
        if (!data) return
        const x = data.hands?.pointer?.[0]?.x || data.hands?.pointer?.[1]?.x
        const y = data.hands?.pointer?.[0]?.y || data.hands?.pointer?.[1]?.y

        // Check bubbles for overlap
        const bubble1Position = bubble1.current.getBoundingClientRect()
        if (
          bubble1Position.left <= x &&
          x <= bubble1Position.right &&
          bubble1Position.top <= y &&
          y <= bubble1Position.bottom &&
          !hoveredBubblesRef.current?.includes(1)
        ) {
          // Add the hovered bubble
          setHoveredBubbles([...hoveredBubblesRef.current, 1])
          // Toggle the animation
          bubble1.current.classList.add('hover')
          // Remove the class for next animation
          setTimeout(() => bubble1.current.classList.remove('hover'), 2000)
          // Add success class
          bubble1.current.classList.add('hovered')
          return
        }
        const bubble2Position = bubble2.current.getBoundingClientRect()
        if (
          bubble2Position.left <= x &&
          x <= bubble2Position.right &&
          bubble2Position.top <= y &&
          y <= bubble2Position.bottom &&
          !hoveredBubblesRef.current.includes(2)
        ) {
          // Set the hovered bubble
          setHoveredBubbles([...hoveredBubblesRef.current, 2])
          // Toggle the animation
          bubble2.current.classList.add('hover')
          // Remove the class for next animation
          setTimeout(() => bubble2.current.classList.remove('hover'), 2000)
          // Add success class
          bubble2.current.classList.add('hovered')
          return
        }
        const bubble3Position = bubble3.current.getBoundingClientRect()
        if (
          bubble3Position.left <= x &&
          x <= bubble3Position.right &&
          bubble3Position.top <= y &&
          y <= bubble3Position.bottom &&
          !hoveredBubblesRef.current.includes(3)
        ) {
          // Set the hovered bubble
          setHoveredBubbles([...hoveredBubblesRef.current, 3])
          // Toggle the animation
          bubble3.current.classList.add('hover')
          // Remove the class for next animation
          setTimeout(() => bubble3.current.classList.remove('hover'), 2000)
          // Add success class
          bubble3.current.classList.add('hovered')
          return
        }
        const bubble4Position = bubble4.current.getBoundingClientRect()
        if (
          bubble4Position.left <= x &&
          x <= bubble4Position.right &&
          bubble4Position.top <= y &&
          y <= bubble4Position.bottom &&
          !hoveredBubblesRef.current.includes(4)
        ) {
          // Set the hovered bubble
          setHoveredBubbles([...hoveredBubblesRef.current, 4])
          // Toggle the animation
          bubble4.current.classList.add('hover')
          // Remove the class for next animation
          setTimeout(() => bubble4.current.classList.remove('hover'), 2000)
          // Add success class
          bubble4.current.classList.add('hovered')
          return
        }
      })
    }, 2000)
    return () => {
      window.handsfree.disablePlugins()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Training | Move</title>
      </Head>
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="w-1/2 text-white">
          {hoveredBubbles.length !== 4 ? (
            <p className="mb-6">
              Move around the screen by waving the palm of your hand to each
              corner of the screen starting from top left corner, labelled{' '}
              {hoveredBubbles.length + 1}.
            </p>
          ) : (
            <h1 className="text-center">Great Job!</h1>
          )}

          <Link href="/training">
            <button>Back</button>
          </Link>
        </div>
        {/* Circles */}
        <div className="bubble" ref={bubble1}>
          1
        </div>
        <div className="bubble" ref={bubble2}>
          2
        </div>
        <div className="bubble" ref={bubble3}>
          3
        </div>
        <div className="bubble" ref={bubble4}>
          4
        </div>
      </div>
    </>
  )
}
