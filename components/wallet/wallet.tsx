'use client';
import { Address, Avatar, Identity, Name } from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import {
  ConnectWallet,
  Wallet as WalletContainer,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

export function Wallet() {
  return (
    <div className="flex justify-end">
      <WalletContainer>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address className={color.foregroundMuted} />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </WalletContainer>
    </div>
  );
}
