'use client';

import { Slider } from './ui/slider';
import { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardFooter } from './ui/card';
import {
  generateHexColors,
  generateRandomHexColor,
  normalizeHexValue,
} from '@jstock/hexgen';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

type SliderProps = React.ComponentProps<typeof Slider>;

type GridProps = {
  start: string;
  end: string;
  count: number;
  includeAlpha: boolean;
};

const copyToClipboard = (color: string) => {
  navigator.clipboard.writeText(color);
  toast(`${color} copied to clipboard`);
};

const ColorGrid = ({ start, end, count, includeAlpha }: GridProps) => {
  const colors = generateHexColors(start, end, count, includeAlpha);

  return (
    <>
      {colors && (
        <div className="mt-4 ml-auto mr-auto grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
          {colors.map((color, index) => {
            return (
              <Card
                key={index}
                role="button"
                aria-labelledby={`${index}Label`}
                className="py-2 gap-0 mr-auto flex flex-col items-center cursor-pointer"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={(handler) => {
                  copyToClipboard(color);
                }}
                title={`copy ${color} to clipboard`}
              >
                <CardContent className="px-2">
                  <div
                    className="size-16 rounded-md"
                    style={{ backgroundColor: color }}
                  ></div>
                </CardContent>
                <CardFooter className="px-2 pt-2">
                  <Label id={`${index}Label`}>{color}</Label>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export function HexGen({ ...props }: SliderProps) {
  const [startColor, setStartColor] = useState('#000000');
  const [endColor, setEndColor] = useState('#ffffff');
  const [count, setCount] = useState(0);
  const [includeAlpha, setIncludeAlpha] = useState(false);

  const startColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartColor(event.target.value);
  };

  const endColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndColor(event.target.value);
  };

  const sliderChange = (value: number[]) => {
    setCount(value[0]);
  };

  const includeAlphaChanged = (checked: boolean) => {
    setIncludeAlpha(checked);

    if (!checked) {
      const normalizedStart = normalizeHexValue(startColor);
      if (normalizedStart && normalizedStart.length === 9) {
        setStartColor(normalizedStart.substring(0, 7));
      }

      const normalizedEnd = normalizeHexValue(endColor);
      if (normalizedEnd && normalizedEnd.length === 9) {
        setEndColor(normalizedEnd.substring(0, 7));
      }
    } else {
      const normalizedStart = normalizeHexValue(startColor);
      if (normalizedStart && normalizedStart.length === 7) {
        setStartColor(normalizedStart + 'ff');
      }

      const normalizedEnd = normalizeHexValue(endColor);
      if (normalizedEnd && normalizedEnd.length === 7) {
        setEndColor(normalizedEnd + 'ff');
      }
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="inline-flex items-center ">
          <h1 className="mr-6 text-3xl">hexgen</h1>
          <Button
            name="randomize"
            role="button"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(event) => {
              setStartColor(generateRandomHexColor(includeAlpha));
              setEndColor(generateRandomHexColor(includeAlpha));
            }}
            className="mr-6"
          >
            Randomize
          </Button>
          <Switch
            id="includeAlpha"
            checked={includeAlpha}
            onCheckedChange={includeAlphaChanged}
          />
          <Label htmlFor="includeAlpha" className="ml-1">
            Include Alpha
          </Label>
        </div>
      </div>

      <div className="inline-flex mt-8">
        <div className="max-w-26">
          <Label htmlFor="start">Start</Label>
          <Input
            type="text"
            id="start"
            value={startColor}
            onChange={startColorChange}
            className="text-sm"
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
              value={[count]}
              className="ml-2 w-3xs mr-2"
              onChange={(event) => {}} // eslint-disable-line @typescript-eslint/no-unused-vars
              onValueChange={sliderChange}
              {...props}
            />
          </div>
        </div>

        <div className="max-w-26">
          <Label htmlFor="end">End</Label>
          <Input
            type="text"
            id="end"
            value={endColor}
            onChange={endColorChange}
            className="text-sm"
          />
        </div>
      </div>

      <div className="mt-8">
        <ColorGrid
          start={startColor}
          end={endColor}
          count={count}
          includeAlpha={includeAlpha}
        />
      </div>
    </div>
  );
}
