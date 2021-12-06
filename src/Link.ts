import { ChainSession } from 'ChainSession';

export interface Link<T> {
	/** Called when the link is asked to participate in the specified session. */
	handle: (this: Link<T>, data: T, session: ChainSession) => void | Promise<void>;

	/** Called when a session that the link participated in was cancelled. */
	onCancel?: (this: Link<T>) => void | Promise<void>;
}

export interface FLink<T> {
	/** Called when the link is asked to participate in the specified session. */
	(data: T, session: ChainSession): void | Promise<void>;
}

export type ChainLink<T> = Link<T> | FLink<T>;
