import {Modal,Window,Open} from "@/components/shared/Modal";

export default function page() {
  return (
    <Modal>
      <Open openName="window">
        <button>Open</button>
      </Open>
      <Window name="window">
          <div className="w-[200px] h-[200px]">
            Info
          </div>
      </Window>
    </Modal>
  );
}
