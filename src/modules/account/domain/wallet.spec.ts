import { WalletCreatedEvent } from './events/wallet-created.event';
import { Wallet } from './wallet';
import { Mnemonic, isAddress } from 'ethers';

describe('Wallet', () => {
  describe('create', () => {
    it('should create a new HDNode and return the mnemonic phrase', () => {
      const userId = 'id';
      const wallet = new Wallet({ userId });
      const phrase = wallet.createHDNode('password');

      expect(phrase).toBeDefined();
      expect(typeof phrase).toBe('string');
      expect(Mnemonic.isValidMnemonic(phrase)).toBe(true);

      const appliedEvent = wallet.getUncommittedEvents();

      expect(appliedEvent).toEqual([new WalletCreatedEvent(userId)]);
    });

    it('should throw an error if HDNode is already initialized', () => {
      const userId = 'id';
      const wallet = new Wallet({ userId });
      wallet.createHDNode('password');

      expect(() => wallet.createHDNode('password')).toThrowError(
        'HDNode already initialized',
      );
    });
  });

  describe('account', () => {
    it('should add a new account', () => {
      const userId = 'id';
      const wallet = new Wallet({ userId });
      wallet.createHDNode('password');

      const account = wallet.addAccount();

      expect(account).toBeDefined();
      expect(account.accountAddress).toBeDefined();
      expect(isAddress(account.accountAddress)).toBe(true);
      expect(account.privkey).toBeDefined();
      expect(account.balance).toBeDefined();
    });

    it('should throw an error if HDNode is not initialized', () => {
      const userId = 'id';
      const wallet = new Wallet({ userId });

      expect(() => wallet.addAccount()).toThrowError('HDNode not initialized');
    });
  });
});
