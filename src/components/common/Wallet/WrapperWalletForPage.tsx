import React, { useContext } from 'react';
import Sidebar from '@/components/common/Sidebar';
import Wallets from '@/components/common/Wallet/Wallets';
import Modal from '@/components/modal/Modal';
import {
  IoFastFoodOutline,
  IoPencilSharp,
  IoTrashOutline,
} from 'react-icons/io5';
import IconCategory, {
  IconCategoryPropsType,
} from '@/components/common/IconCategory/IconCategory';
import WalletCreateEditForm from '@/components/common/Wallet/WalletCreateEditForm';
import { SidebarWalletContext } from '@/contexts/WalletSidebarProvider';
import ContextMenu, { MenuTye } from '@/components/contextmenu/ContextMenu';
import { useAppSelector } from '@/lib/hook';
import Button from '@/components/button';

const icons: IconCategoryPropsType['icons'] = [
  {
    id: 1,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 2,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 3,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 4,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 5,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 6,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 7,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 8,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 9,
    renderIcon: <IoFastFoodOutline />,
  },
  {
    id: 10,
    renderIcon: <IoFastFoodOutline />,
  },
];

const WrapperWalletForPage = () => {
  const { state, action, variable } = useContext(SidebarWalletContext);
  const walletsOverview = useAppSelector((state) => state.wallet.overview);
  const contextMenu: MenuTye[] = [
    {
      title: 'Edit',
      icon: <IoPencilSharp />,
      onClick: () => {
        action.onToggleCreateEditWalletModal();
      },
    },
    {
      title: 'Delete',
      icon: <IoTrashOutline />,
      onClick: () => {
        action.onToggleConfirmDeleteWallet();
      },
    },
  ];

  return (
    <>
      <Sidebar
        open={state.openWalletsSideBar}
        onClose={action.onToggleWalletSidebar}
      >
        <Wallets
          wallets={walletsOverview}
          onCreateWallet={action.onCreateWallet}
          onChangeWalletCurrent={action.onChangeWalletCurrent}
          onOpenContextAndSelected={action.onOpenContextAndSelected}
        />
      </Sidebar>
      <Modal
        open={state.openCreateEditWalletModal}
        onClose={action.onToggleCreateEditWalletModal}
      >
        <WalletCreateEditForm
          key={state.walletSelected?.walletID}
          modeWalletForm={variable.modeWalletForm}
          wallet={state.walletSelected}
          onToggleWalletIconModal={action.onToggleWalletIconModal}
          onToggleWalletForm={action.onToggleWalletForm}
        />
      </Modal>
      <Modal
        open={state.openWalletIconModal}
        onClose={action.onToggleWalletIconModal}
      >
        <IconCategory
          icons={icons}
          onClickIcon={action.onToggleWalletIconModal}
        />
      </Modal>
      <Modal
        open={state.openConfirmDelete}
        onClose={action.onToggleConfirmDeleteWallet}
      >
        <div>
          <div className="text-[20px] mb-4">Confirm delete</div>
          <div className="text-[14px]">Do you want delete wallet ?</div>
          <div className="flex justify-end gap-x-2 mt-4">
            <Button className="bg-red-500" onClick={action.onDeleteWallet}>
              Yes
            </Button>
            <Button
              onClick={() => {
                action.onToggleConfirmDeleteWallet();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <ContextMenu
        open={state.openContextMenu}
        onClose={action.onToggleContextMenu}
        menu={contextMenu}
      />
    </>
  );
};

export default WrapperWalletForPage;
