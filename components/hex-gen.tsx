'use client';

import { Slider } from './ui/slider';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardFooter } from './ui/card';
import { generateHexColors } from '@jstock/hexgen';

type SliderProps = React.ComponentProps<typeof Slider>;

export function HexGen({ ...props }: SliderProps) {
  const [startColor, setStartColor] = useState('#000000');
  const [endColor, setEndColor] = useState('#ffffff');
  const [count, setCount] = useState([0]);
  const [colors, setColors] = useState([startColor, endColor]);

  useEffect(() => {
    const newColors = generateHexColors(startColor, endColor, count[0]);
    if (newColors) {
      setColors(newColors);
    }
  }, [startColor, endColor, count]);

  const startColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartColor(event.target.value);
  };

  const endColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndColor(event.target.value);
  };

  const sliderChange = (value: number[]) => {
    setCount(value);
  };

  return (
    <div>
      <h1>HexGen</h1>

      <div className="inline-flex mt-4">
        <div className="w-26">
          <Label htmlFor="start">Start</Label>
          <Input
            type="text"
            id="start"
            value={startColor}
            onChange={startColorChange}
          />
        </div>

        <div>
          <Label htmlFor="Count" className="mb-1">
            Count
          </Label>
          <div className="inline-flex">
            <Slider
              min={0}
              max={100}
              step={1}
              value={count}
              className="ml-2 w-3xs mr-2"
              onChange={(event) => {}} // eslint-disable-line @typescript-eslint/no-unused-vars
              onValueChange={sliderChange}
              {...props}
            />
          </div>
        </div>

        <div className="w-26">
          <Label htmlFor="end">End</Label>
          <Input
            type="text"
            id="end"
            value={endColor}
            onChange={endColorChange}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 md:grid-cols-8 gap-4">
        {colors.map((color, index) => {
          return (
            <Card key={index} className="py-2 gap-0 flex flex-col items-center">
              <CardContent className="px-2">
                <div
                  className="size-16 rounded-md"
                  style={{ backgroundColor: color }}
                ></div>
              </CardContent>
              <CardFooter className="px-2 pt-2">
                <Label>{color}</Label>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
