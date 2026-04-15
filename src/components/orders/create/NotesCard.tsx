type NotesCardProps = {
  notes: string;
  privateNote: boolean;
  awbNote: boolean;
  onNotesChange: (value: string) => void;
  onPrivateNoteChange: (value: boolean) => void;
  onAwbNoteChange: (value: boolean) => void;
};

export function NotesCard({
  notes,
  privateNote,
  awbNote,
  onNotesChange,
  onPrivateNoteChange,
  onAwbNoteChange,
}: NotesCardProps) {
  return (
    <section className="panel p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">Notes</h2>
      <textarea
        id="order-notes"
        name="notes"
        className="input min-h-24"
        placeholder="Order notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
      <div className="mt-3 space-y-2">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            id="private-note"
            name="privateNote"
            type="checkbox"
            checked={privateNote}
            onChange={(e) => onPrivateNoteChange(e.target.checked)}
          />
          Private note
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input id="awb-note" name="awbNote" type="checkbox" checked={awbNote} onChange={(e) => onAwbNoteChange(e.target.checked)} />
          AWB note
        </label>
      </div>
    </section>
  );
}
