
import React from 'react';
import "../../global.css";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const RippleEffect: React.FC = () => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const x = e.clientX;
      const y = e.clientY;

      setRipples(prev => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="ripple-container">
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            top: ripple.y - 25,
            left: ripple.x - 25,
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;