export default function PaymentSelection({ value, onChange }) {
  return (
    <div className="mt-6">
      <h2 className="font-semibold text-gray-700 mb-2">Payment Method</h2>
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="UPI"
            checked={value === "UPI"}
            onChange={(e) => onChange(e.target.value)}
            className="form-radio h-4 w-4 text-edubites-sky"
          />
          UPI
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={value === "COD"}
            onChange={(e) => onChange(e.target.value)}
            className="form-radio h-4 w-4 text-edubites-sky"
          />
          Cash on Delivery
        </label>
      </div>
    </div>
  );
}
