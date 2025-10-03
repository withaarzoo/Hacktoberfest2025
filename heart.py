import matplotlib.pyplot as plt
import numpy as np

# Create a range of values for 't' (theta)
# This represents the angle from which the heart shape is derived.
t = np.linspace(0, 2 * np.pi, 100)

# Define the parametric equations for the heart shape
# These equations use trigonometric functions to create the heart's curves.
x = 16 * np.sin(t)**3
y = 13 * np.cos(t) - 5 * np.cos(2*t) - 2 * np.cos(3*t) - np.cos(4*t)

# Plot the heart shape
# 'r-' specifies a red solid line.
# 'linewidth' controls the thickness of the line.
plt.plot(x, y, 'r-', linewidth=2)

# Set the aspect ratio to be equal, so the heart doesn't appear distorted.
plt.gca().set_aspect('equal', adjustable='box')

# Remove the axes for a cleaner look.
plt.axis('off')

# Display the plot.
plt.show()
