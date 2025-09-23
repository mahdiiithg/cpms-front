import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature') || headers().get('x-webhook-signature');
    
    // Verify webhook signature (implementation depends on your payment provider)
    // const isValidSignature = verifyWebhookSignature(body, signature);
    // if (!isValidSignature) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    const event = JSON.parse(body);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
      
      case 'invoice.payment_succeeded':
        await handleSubscriptionPayment(event.data.object);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionCancelled(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent) {
  try {
    // Update payment status in database
    // Send confirmation email
    // Activate subscription
    console.log('Payment succeeded:', paymentIntent.id);
    
    // You would typically:
    // 1. Update payment record in database
    // 2. Activate user subscription
    // 3. Send confirmation email
    // 4. Send push notification
    
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentIntent) {
  try {
    // Update payment status
    // Send failure notification
    console.log('Payment failed:', paymentIntent.id);
    
    // You would typically:
    // 1. Update payment record as failed
    // 2. Send failure notification
    // 3. Log for retry attempts
    
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handleSubscriptionPayment(invoice) {
  try {
    // Handle recurring subscription payments
    console.log('Subscription payment succeeded:', invoice.id);
    
  } catch (error) {
    console.error('Error handling subscription payment:', error);
  }
}

async function handleSubscriptionCreated(subscription) {
  try {
    // Handle new subscription creation
    console.log('Subscription created:', subscription.id);
    
  } catch (error) {
    console.error('Error handling subscription creation:', error);
  }
}

async function handleSubscriptionUpdated(subscription) {
  try {
    // Handle subscription updates (plan changes, etc.)
    console.log('Subscription updated:', subscription.id);
    
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

async function handleSubscriptionCancelled(subscription) {
  try {
    // Handle subscription cancellation
    console.log('Subscription cancelled:', subscription.id);
    
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}
