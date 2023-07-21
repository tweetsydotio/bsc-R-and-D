import pyautogui
# Continuously display the mouse coordinates
while True:
    x, y = pyautogui.position()
    print(f"Mouse coordinates: x={x}, y={y}")