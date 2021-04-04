import { useEffect, useRef, useState } from 'react'

// Grocery items
const items: ItemProps[] = [
  {
    imageUrl: '/lime.png',
    name: 'Lime'
  },
  {
    imageUrl: '/beef.png',
    name: 'Ground Beef'
  },
  {
    imageUrl: '/potato.png',
    name: 'Potato'
  },
  {
    imageUrl: '/orange.png',
    name: 'Orange'
  },
  {
    imageUrl: '/egg.png',
    name: 'Egg'
  },
  {
    imageUrl: '/apple.png',
    name: 'Apple'
  },
  {
    imageUrl: '/onion.png',
    name: 'Onion'
  },
  {
    imageUrl: '/pepper.png',
    name: 'Bell Pepper'
  },
  {
    imageUrl: '/salmon.png',
    name: 'Salmon'
  }
]

export default function Groceries() {
  const [quantities, setQuantity] = useState(items)

  // On mount, start handsfree
  useEffect(() => {
    setTimeout(() => window.handsfree?.plugin.palmPointers.enable(), 2000)
  }, [])

  useEffect(() => {
    // Disables right click functionality
    document.addEventListener('contextmenu', disableRightClick)
    return () => {
      // Remove event listener on unmount
      document.removeEventListener('contextmenu', disableRightClick)
    }
  }, [])

  function disableRightClick(event: MouseEvent) {
    event.preventDefault()
  }

  return (
    <div
      className="grid bg-white text-2xl min-h-screen"
      style={{
        height: '100vh',
        gridTemplateColumns: 'auto 300px'
      }}
    >
      {/* Left */}
      <div className="bg-white flex gap-5 py-6">
        {/* Instructions */}
        <div className="w-1/4 flex flex-col items-center gap-5 p-5">
          <p className="text-2xl text-grey">
            Use hand gestures only, add 5 limes to your cart.
          </p>
          <img
            src="/cart-instructions.png"
            alt="instructions"
            className="w-full"
          />
          <button className="white">View Cheat Sheet</button>
        </div>
        {/* Items */}
        <div>
          <p className="text-2xl text-grey mb-2">Groceries</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {items.map(({ imageUrl, name }, i) => (
              <Item
                key={name}
                imageUrl={imageUrl}
                name={name}
                quantity={quantities[i].quantity ?? 0}
                onChange={(quantity: number) => {
                  setQuantity((prevQuantities) => {
                    // Ignore negative quantities
                    if (quantity < 0) return prevQuantities

                    // Update quantity
                    prevQuantities[i].quantity = quantity
                    return [...prevQuantities]
                  })
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Cart */}
      <div className="bg-pink min-h-screen text-white py-6 px-4">
        <div className="sticky top-6">
          <div>Your Cart</div>
          <hr className="my-2" />
          <ul
            className="grid"
            style={{
              gridTemplateColumns: 'auto 40px'
            }}
          >
            {items
              .filter((_item, i) => quantities[i].quantity > 0)
              .map((item) => {
                return (
                  <>
                    <li>{item.name}:</li>
                    <li className="text-right">{item.quantity}</li>
                  </>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

type ItemProps = {
  imageUrl: string
  name: string
  quantity?: number
  onChange?: (quantity: number) => void
}

/** Controller component representing an grocery item */
function Item({ imageUrl, name, quantity = 0, onChange }: ItemProps) {
  const buttonRef = useRef(null) // Holds reference to the - button
  // Share component quantity with event listeners due to having no access to
  // internal component state after creation
  const quantityRef = useRef<number>(quantity)

  // Keep quantity and quantityRef in sync
  useEffect(() => {
    quantityRef.current = quantity
  }, [quantity])

  useEffect(() => {
    if (buttonRef.current) {
      // https://stackoverflow.com/questions/17859051/can-i-handle-a-right-click-event-on-an-html-button-element
      buttonRef.current.addEventListener('contextmenu', onRightClick)
    }
    return () => {
      buttonRef.current.removeEventListener('contextmenu', onRightClick)
    }
  }, [])

  function onRightClick(event: MouseEvent) {
    // Reduce the quantity
    onChange(quantityRef.current - 1)
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <img src={imageUrl} alt={name} className="w-full object-cover" />
      {name}
      <div className="flex items-center gap-2">
        {/* TODO: Update to be onRightClick */}
        {/*  https://stackoverflow.com/questions/17859051/can-i-handle-a-right-click-event-on-an-html-button-element */}
        <button className="white toggle" ref={buttonRef}>
          -
        </button>
        <div className="border-pink border px-2 py-1 rounded w-6 text-center">
          {quantity}
        </div>
        <button className="white toggle" onClick={() => onChange(quantity + 1)}>
          +
        </button>
      </div>
    </div>
  )
}
