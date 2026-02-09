import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';

interface DeleteModalProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  onDeleteConfirm: () => void;
  modalTitle?: string;
  modalDescription?: string;
}

function DeleteModal({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onDeleteConfirm,
  modalTitle = 'Delete Device',
  modalDescription = 'Are you sure you want to delete selected item?',
}: DeleteModalProps) {
  // modal sample description :  Are you sure you want to delete the device "{deviceName}"?

  return (
    <>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{modalDescription}</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteModal;
