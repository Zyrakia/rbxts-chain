# Chain

A super simple chain of command pattern implementation. This is often used in HTTP request validation, which can be translated to Roblox to validate things on the client and server. It doesn't have to be used for validation though, it can be used in any scenario where you need to execute one thing after another, and you want that system to be modular.

## Example

A simple example.

```ts
interface HitValidationInfo {
	hitterRig: CharacterRigR15;
	targetRig: CharacterRigR15;
}

const chain = new Chain<HitValidationInfo>();

class DistanceValidator implements Link<HitValidationInfo> {
	public constructor(private thresholdStuds: number) {}

	public handle(data: HitValidationInfo, session: ChainSession) {
		const hitterPos = data.hitterRig.HumanoidRootPart.Position;
		const targetPos = data.targetRig.HumanoidRootPart.Position;
		const mag = hitterPos.sub(targetPos).Magnitude;
		if (mag > this.thresholdStuds) session.cancel();
	}
}

// A 'link' can be a function or class
chain.addLink(new DistanceValidator(8), () => {
	print("This will only print out if the first link doesn't cancel the session!");
});

const result = chain.startSession({ ... });
if (result.wasCancelled()) print("Oh no!")
```
