import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface TimeSlotPickerProps {
  selectedDate?: Date;
  selectedTime?: string;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

const TimeSlotPicker = ({ 
  selectedDate, 
  selectedTime, 
  onDateSelect, 
  onTimeSelect 
}: TimeSlotPickerProps) => {
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-salon-charcoal">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateSelect(date)}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            className="rounded-md border-salon-sage"
          />
          {selectedDate && (
            <div className="mt-4 p-3 bg-salon-cream rounded-lg">
              <p className="text-salon-charcoal font-medium">
                Selected: {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-salon-charcoal">Available Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  className={`${
                    selectedTime === time
                      ? 'bg-salon-gold text-white hover:bg-salon-gold-light'
                      : 'border-salon-sage text-salon-charcoal hover:bg-salon-cream'
                  }`}
                  onClick={() => onTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimeSlotPicker;