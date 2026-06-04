"use client";

import { countries } from "@/utils/countries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CountrySelectorProps {
  value: string;
  onChange: (code: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Country</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name} ({country.currencySymbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
