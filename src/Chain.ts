import inspect from '@rbxts/inspect';
import { ChainSession } from 'ChainSession';
import { ChainSessionResult } from 'ChainSessionResult';
import { ChainLink } from 'Link';

export class Chain<T> {
	private links = new Array<ChainLink<T>>();

	public async startSession(data: T) {
		const ranLinks = new Array<ChainLink<T>>();
		const session = new ChainSession();

		for (const link of this.links) {
			try {
				this.runLink(link, data, session);
				ranLinks.push(link);
			} catch (e) {
				session.cancel();
				warn(
					`Link session was cancelled due to error in link ${inspect(
						link,
					)}.\nError: ${e}`,
				);
			}

			if (session.isCancelled()) {
				for (const link of ranLinks) {
					task.spawn(() => this.cancelLink(link));
				}

				break;
			}
		}

		return new ChainSessionResult(session, data);
	}

	private async runLink(link: ChainLink<T>, data: T, session: ChainSession) {
		if (typeIs(link, 'function')) await link(data, session);
		else await link.handle(data, session);
	}

	private cancelLink(link: ChainLink<T>) {
		if (typeIs(link, 'function')) return;
		link.onCancel?.();
	}

	public addLinks(...links: Array<ChainLink<T>>) {
		this.links = [...this.links, ...links];
	}

	public removeLink(link: ChainLink<T>) {
		const index = this.links.indexOf(link);
		if (index === -1) return;
		return this.links.remove(index);
	}

	public clearLinks() {
		this.links.clear();
	}

	public getLinks() {
		return this.links;
	}
}
