import { NextResponse } from 'next/server'; // Import NextResponse
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

export async function POST(request) {
  try {
    const body = await request.json();  // Parse the request body
    const { token, amount } = body;     // Extract the token and amount from the body

    if (!token || !amount) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Missing token or amount.' }),
        { status: 400 } // Bad request
      );
    }

    // Create a charge with Stripe API
    const charge = await stripe.charges.create({
      amount,
      currency: 'inr',        // Currency type (Indian Rupee)
      source: token.id,       // The token received from frontend
      description: 'Supermarket payment', // Description of the payment
    });

    return new NextResponse(
      JSON.stringify({ success: true, data: charge.id }),
      { status: 200 } // Successful request
    );
  } catch (err) {
    console.error('Stripe Error:', err);
    return new NextResponse(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 } // Internal server error
    );
  }
}
