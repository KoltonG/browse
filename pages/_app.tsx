import { useEffect } from 'react'
import Handsfree from 'handsfree'
import '../styles/globals.scss'

export default function BrowseApp({ Component, pageProps }) {
  // When the app loads, enable handsfree
  useEffect(() => {
    // Instantiated handsfree with the hand model.
    // Saving the reference to the window object
    window.handsfree = new Handsfree({
      hands: {
        enabled: true,
        maxNumHands: 1
      }
      // TODO: Instantiate with the face model as well.
      // weboji: true,
    })
    // Create the click gestures
    window.handsfree.useGesture({
      name: 'leftClick',
      algorithm: 'fingerpose',
      models: 'hands',
      confidence: '9',
      description: [
        ['addCurl', 'Thumb', 'NoCurl', 1],
        ['addDirection', 'Thumb', 'DiagonalUpLeft', 1],
        ['addCurl', 'Index', 'FullCurl', 1],
        ['addDirection', 'Index', 'DiagonalUpLeft', 1],
        ['addDirection', 'Index', 'VerticalUp', 0.3333333333333333],
        ['addCurl', 'Middle', 'NoCurl', 1],
        ['addDirection', 'Middle', 'VerticalUp', 1],
        ['addCurl', 'Ring', 'NoCurl', 1],
        ['addDirection', 'Ring', 'VerticalUp', 1],
        ['addCurl', 'Pinky', 'NoCurl', 1],
        ['addDirection', 'Pinky', 'DiagonalUpRight', 1],
        ['addDirection', 'Pinky', 'VerticalUp', 0.5],
        ['addDirection', 'Thumb', 'DiagonalUpRight', 1],
        ['addDirection', 'Index', 'DiagonalUpRight', 1],
        ['addDirection', 'Pinky', 'DiagonalUpLeft', 1],
        ['setWeight', 'Index', 2]
      ]
    })
    window.handsfree.useGesture({
      name: 'rightClick',
      algorithm: 'fingerpose',
      models: 'hands',
      confidence: '8',
      description: [
        ['addCurl', 'Thumb', 'HalfCurl', 1],
        ['addCurl', 'Thumb', 'NoCurl', 0.06666666666666667],
        ['addDirection', 'Thumb', 'VerticalUp', 0.875],
        ['addDirection', 'Thumb', 'DiagonalUpRight', 1],
        ['addDirection', 'Thumb', 'DiagonalUpLeft', 0.125],
        ['addCurl', 'Index', 'NoCurl', 1],
        ['addDirection', 'Index', 'DiagonalUpLeft', 1],
        ['addCurl', 'Middle', 'NoCurl', 1],
        ['addDirection', 'Middle', 'DiagonalUpLeft', 1],
        ['addCurl', 'Ring', 'NoCurl', 1],
        ['addDirection', 'Ring', 'VerticalUp', 1],
        ['addCurl', 'Pinky', 'NoCurl', 1],
        ['addDirection', 'Pinky', 'VerticalUp', 0.06666666666666667],
        ['addDirection', 'Pinky', 'DiagonalUpRight', 1],
        ['addDirection', 'Thumb', 'DiagonalUpLeft', 1],
        ['addDirection', 'Thumb', 'DiagonalUpRight', 0.125],
        ['addDirection', 'Index', 'DiagonalUpRight', 1],
        ['addDirection', 'Middle', 'DiagonalUpRight', 1],
        ['addDirection', 'Pinky', 'DiagonalUpLeft', 1],
        ['setWeight', 'Thumb', 2]
      ],
      enabled: true
    })
    // Starting handsfree
    // TODO: We can programmatically start and potentially stop this
    window.handsfree.start()

    // Create events for tracking
    // From an event
    document.addEventListener('handsfree-data', (event) => {
      const data = event.detail
      if (!data.hands) return

      // Track left hand
      let x = data.hands?.pointer?.[0]?.x
      let y = data.hands?.pointer?.[0]?.y
      if (data.hands?.gesture?.[0]?.name === 'leftClick') {
        console.log(`Left 🖐 - Left 🖱  at x: ${x} y: ${y}`)
        document.elementFromPoint(x, y).click()
      }
      if (data.hands?.gesture?.[0]?.name === 'rightClick') {
        console.log(`Left 🖐 - Right 🖱  at x: ${x} y: ${y}`)
        const element = document.elementFromPoint(x, y)
        element.dispatchEvent(new CustomEvent('contextmenu'))
      }

      // Track right hand
      x = data.hands?.pointer?.[1]?.x
      y = data.hands?.pointer?.[1]?.y
      if (data.hands?.gesture?.[1]?.name === 'leftClick') {
        console.log(`Right 🖐 - Left 🖱 at x: ${x} y: ${y}`)
        document.elementFromPoint(x, y).click()
      }
      if (data.hands?.gesture?.[1]?.name === 'rightClick') {
        console.log(`Right 🖐 - Right 🖱 at x: ${x} y: ${y}`)
        const element = document.elementFromPoint(x, y)
        element.dispatchEvent(new CustomEvent('contextmenu'))
      }
    })
  }, [])

  return <Component {...pageProps} />
}
