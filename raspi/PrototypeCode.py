import RPi.GPIO as GPIO
import time
from datetime import datetime

# GPIO Configuration
GPIO.setmode(GPIO.BCM)

# Pins for RGB LED
PIN_RED = 22
PIN_GREEN = 17
PIN_BLUE = 27

# Pins for Notification LED and Buttons
PIN_NOTIFICATION_LED = 24
BUTTON_PIN = 18
BUTTON_NOTIFICATION_PIN = 25

# PWM Frequency
FREQUENCY = 15000  # 15 kHz

# Setup GPIO pins
GPIO.setup(PIN_RED, GPIO.OUT)
GPIO.setup(PIN_GREEN, GPIO.OUT)
GPIO.setup(PIN_BLUE, GPIO.OUT)
GPIO.setup(PIN_NOTIFICATION_LED, GPIO.OUT)
GPIO.setup(BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON_NOTIFICATION_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Initialize PWM for RGB LED
pwm_red = GPIO.PWM(PIN_RED, FREQUENCY)
pwm_green = GPIO.PWM(PIN_GREEN, FREQUENCY)
pwm_blue = GPIO.PWM(PIN_BLUE, FREQUENCY)
pwm_red.start(0)
pwm_green.start(0)
pwm_blue.start(0)

# RGB Color Definitions
COLORES = {
    'Rojo': (255, 0, 0),
    'Verde': (0, 255, 0),
    'Azul': (0, 0, 255),
    'Amarillo': (255, 255, 0),
    'Blanco': (255, 255, 255),
    'Morado': (128, 0, 128)
}

# Simulated Data
orders = {
    1: {"total_items": 2, "remaining_items": 2, "cubbies": []},
    2: {"total_items": 2, "remaining_items": 2, "cubbies": []},
    3: {"total_items": 2, "remaining_items": 2, "cubbies": []}
}
cubbies = {1: None, 2: None, 3: None, 4: None, 5: None}  # None means cubby is available

# Helper Functions
def gamma_correction(value, gamma=2.2):
    return int((value / 255) ** gamma * 255)

def encender_led_rgb(color):
    r, g, b = COLORES.get(color, (0, 0, 0))
    r = gamma_correction(r)
    g = gamma_correction(g)
    b = gamma_correction(b)
    pwm_red.ChangeDutyCycle(100 - (r / 255) * 100)
    pwm_green.ChangeDutyCycle(100 - (g / 255) * 100)
    pwm_blue.ChangeDutyCycle(100 - (b / 255) * 100)

def apagar_led_rgb():
    pwm_red.ChangeDutyCycle(100)
    pwm_green.ChangeDutyCycle(100)
    pwm_blue.ChangeDutyCycle(100)

def encender_led_normal():
    GPIO.output(PIN_NOTIFICATION_LED, GPIO.HIGH)

def apagar_led_normal():
    GPIO.output(PIN_NOTIFICATION_LED, GPIO.LOW)

def assign_cubby(order_id):
    for cubby_id, assigned_order in cubbies.items():
        if assigned_order is None:
            cubbies[cubby_id] = order_id
            orders[order_id]["cubbies"].append(cubby_id)
            return cubby_id
    return None

def free_cubbies(order_id):
    for cubby_id in orders[order_id]["cubbies"]:
        cubbies[cubby_id] = None
    orders[order_id]["cubbies"] = []

# Main Loop
try:
    apagar_led_rgb()
    apagar_led_normal()

    while True:
        print("\nScanning for items...")
        for order_id, order in orders.items():
            if order["remaining_items"] > 0:
                print(f"Processing Order {order_id}...")
                cubby_id = assign_cubby(order_id)
                if cubby_id is None:
                    print("No available cubbies. Waiting...")
                    time.sleep(1)
                    continue

                print(f"Assigned to Cubby {cubby_id}. Remaining items: {order['remaining_items'] - 1}")
                encender_led_rgb("Verde")

                # Simulate button press for confirmation
                print("Waiting for button press to confirm...")
                while GPIO.input(BUTTON_PIN) == GPIO.HIGH:
                    time.sleep(0.1)
                time.sleep(0.1)  # Debounce
                apagar_led_rgb();
                
                time.sleep(2)

                order["remaining_items"] -= 1
                if order["remaining_items"] == 0:
                    print(f"Order {order_id} is complete!")
                    free_cubbies(order_id)
                    encender_led_normal()
                    print("Waiting for notification button press...")
                    while GPIO.input(BUTTON_NOTIFICATION_PIN) == GPIO.HIGH:
                        time.sleep(0.1)
                    apagar_led_normal()

        print("All orders processed. Waiting for new scans...")
        time.sleep(5)

except KeyboardInterrupt:
    print("Program interrupted. Cleaning up...")
finally:
    apagar_led_rgb()
    apagar_led_normal()
    pwm_red.stop()
    pwm_green.stop()
    pwm_blue.stop()
    GPIO.cleanup()
    print("GPIO cleaned up. Program terminated.")
