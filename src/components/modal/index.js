import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearModal } from "../../redux/actions/modal";
import CommentModal from "./comment";

const Modal = () => {
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const bottomSheetRef = useRef(null);
  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, [modalState]);
  const handleClose = () => {
    dispatch(clearModal());
  };

  const renderContent = () => {
    switch (modalState.modalType) {
      case 0:
        return <CommentModal post={modalState.data} />;
      default:
        return <></>;
    }
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["50%"]}
      index={-1}
      onClose={handleClose}
      handleHeight={40}
      enablePanDownToClose
    >
      {renderContent()}
    </BottomSheet>
  );
};

export default Modal;
