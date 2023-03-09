# Motion

All motion components are powered by [Framer Motion](https://www.framer.com/motion).

## Available Components

| Components               | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| MotionAnimate            | To create a component with loop-animation                          |
| MotionCursor             | To add an additional cursor pointer that follow your mouse pointer |
| MotionDiv                | To create a component with animation from invisible to visible     |
| MotionParallaxHorizontal | To create parallax component                                       |
| MotionProgressBar        | To add an additional progress bar to your page                     |
| MotionReorder            | To create components that can be reorder/sorted                    |

### MotionAnimate

```jsx
import { MotionAnimate } from '@mon/mon-ui';

<MotionAnimate animate={{ y: [1, 20, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
  <div>up and down</div>
</MotionAnimate>;
```

### MotionCursor

```jsx
import { MotionCursor } from '@mon/mon-ui';

<MotionCursor />;
```

### MotionDiv

```jsx
import { MotionDiv } from '@mon/mon-ui';

<MotionDiv offscreen={{ x: -1300, y: 0 }} transition={{ type: 'spring', duration: 2 }}>
  <p>
    Maecenas quis elementum nulla, in lacinia nisl. Ut rutrum fringilla aliquet. Pellentesque auctor vehicula
    malesuada. Aliquam id feugiat sem, sit amet tempor nulla. Quisque fermentum felis faucibus, vehicula metus
    ac, interdum nibh. Curabitur vitae convallis ligula. Integer acenim vel felis pharetra laoreet. Interdum
    et malesuada fames ac ante ipsum primis in faucibus. Pellentesque hendrerit ac augue quis pretium.
  </p>
</MotionDiv>;
```

### MotionParallaxHorizontal

```jsx
import { MotionParallaxHorizontal } from "@mon/mon-ui";

<MotionParallaxHorizontal baseVelocity={-1.5}>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 1</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 2</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 3</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 4</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 5</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 6</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 7</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 8</div>
</MotionParallaxHorizontal>
<MotionParallaxHorizontal baseVelocity={1.5}>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 1</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 2</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 3</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 4</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 5</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 6</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 7</div>
  <div style={{fontSize: 20, display: 'block', marginRight: 30 }}>Test Parallax Horizontal 8</div>
</MotionParallaxHorizontal>
```

### MotionProgressBar

```jsx
import { MotionProgressBar } from '@mon/mon-ui';

<MotionProgressBar />;
```

### MotionReorder

```jsx
import { MotionReorder, MotionReorderItem } from "@mon/mon-ui";

const [items, setItems] = useState([
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'donatello' },
  { id: 4, name: 'rafael' }
])

<MotionReorder
  axis='x'
  items={items}
  setItems={setItems}
  className='flex space-x-2'>
    {items.map((item) => (
      <MotionReorderItem key={item.id} data={item} axis='x'>
        <div className='bg-white p-5 border my-2'>
          {item.name}
        </div>
      </MotionReorderItem>
    ))}
</MotionReorder>
```

### Contributors

If you are contributing into this project, please create a pull-request by adding your github account below.

[Ais](https://github.com/~/madebyais)
