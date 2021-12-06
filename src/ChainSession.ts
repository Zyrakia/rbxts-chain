export class ChainSession<T> {
	private cancelled = false;

	public cancel() {
		this.cancelled = true;
	}

	public isCancelled() {
		return this.cancelled;
	}
}
