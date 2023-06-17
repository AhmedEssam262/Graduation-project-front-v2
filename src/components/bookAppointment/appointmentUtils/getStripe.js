import { loadStripe } from "@stripe/stripe-js";
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51M9qWBLkzeNmV6Wx5JxH5L1nVm5mfpSGoDFTwQ3kYCgq6g27TeJUvnpabzWTsREcafbUJoYYXOF4LODNKIKTbNS700GeW2fOTz"
    );
  }
  return stripePromise;
};
export default getStripe;
