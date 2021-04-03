import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    name: 'apple'
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

  useEffect(() => {
    document.addEventListener('contextmenu', (event) => event.preventDefault())
    return () => {
      // TODO: Remove e
      document.removeEventListener('contextmenu', (event) =>
        event.preventDefault()
      )
    }
  }, [])

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
                imageUrl={imageUrl}
                name={name}
                quantity={quantities[i].quantity ?? 0}
                onChange={(quantity: number) => {
                  setQuantity((prevQuantities) => {
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

function Item({ imageUrl, name, quantity = 0, onChange }: ItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <img src={imageUrl} alt={name} className="w-full object-cover" />
      {name}
      <div className="flex items-center gap-2">
        {/* TODO: Update to be onRightClick */}
        {/*  https://stackoverflow.com/questions/17859051/can-i-handle-a-right-click-event-on-an-html-button-element */}
        <button className="white toggle" onClick={() => onChange(quantity - 1)}>
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
