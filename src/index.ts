export async function gamepadButtonPress(listeners: Record<number,(gamepad: Gamepad) => void>) {
  const lastStates: boolean[][] = [];

  while (true) {
    const gamepads: Gamepad[] = [...navigator.getGamepads()].filter(Boolean) as Gamepad[];

    if (gamepads.length === 0){
      await new Promise(resolve => addEventListener("gamepadconnected",resolve,{ once: true }));
      continue;
    }

    await new Promise(requestAnimationFrame);

    for (const gamepad of gamepads) {
      const state: boolean[] = gamepad.buttons.map(button => button.pressed);
      const lastState: boolean[] = lastStates[gamepad.index] || state.map(() => false);

      for (const [buttonIndex,callback] of Object.entries(listeners)){
        const wasPressed = lastState[+buttonIndex]!;
        const pressed = state[+buttonIndex]!;
        if (pressed && !wasPressed) callback(gamepad);
      }

      lastStates[gamepad.index] = state;
    }
  }
}

// Example usage:
gamepadButtonPress({
  0: (gamepad) => console.log(gamepad),
  3: (gamepad) => console.log(gamepad),
});