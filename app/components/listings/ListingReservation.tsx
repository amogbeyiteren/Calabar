'use client';

import { Range } from "react-date-range";
import { useState } from "react";
import { PaystackButton } from 'react-paystack'
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  onPaymentSuccess: () => void; // Add onPaymentSuccess prop

  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onPaymentSuccess, // Receive onPaymentSuccess prop
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {

  const publicKey = "pk_test_2c518b6f78f30d2675048a24dd6b9ee925d74204"
 
  const amount = 1000000
  const [email, setEmail] = useState("bolu@email.com")
  const [name, setName] = useState("bolu123")
  const [phone, setPhone] = useState("002829")

  const componentProps = {
    email,
    amount: totalPrice,
    metadata: {
      name,
      phone,
      custom_fields: [] // Add the empty custom_fields array
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      onPaymentSuccess();
    },
    onClose: () => alert("This Transaction Will Be Canceled"),
  };

  return ( 




    <div 
      className="
      bg-[white]
        rounded-xl 
      border-gray-400 border-[1px]
        overflow-hidden
      "
    >
      <div className="
      flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
        ₦ {price}
        </div>
        <div className="font-light text-neutral-600">
          day
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        {/* <Button 
          disabled={disabled} 
          label="Reserve" 
          onClick={onSubmit}
        /> */}
         <PaystackButton className="bg-green-500 hover:bg-green-600 w-full px-10 py-3 rounded-md text-white text-center font-bold" {...componentProps} />
      </div>
      <hr />
      <div 
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>
          Total
        </div>
        <div>
        ₦ {totalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;