type NotesCardProps = {
  notes: string;
  privateNote: string;
  awbNote: string;
  onNotesChange: (value: string) => void;
  onPrivateNoteChange: (value: string) => void;
  onAwbNoteChange: (value: string) => void;
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
        <textarea
          id="order-private-note"
          name="privateNote"
          className="input min-h-20"
          placeholder="Private note (internal only)"
          value={privateNote}
          onChange={(e) => onPrivateNoteChange(e.target.value)}
        />
        <textarea
          id="order-awb-note"
          name="awbNote"
          className="input min-h-20"
          placeholder="AWB note (courier / label context)"
          value={awbNote}
          onChange={(e) => onAwbNoteChange(e.target.value)}
        />
      </div>
    </section>
  );
}
