export default function StatCard({ icon: Icon, iconBg, iconColor, label, value, helper, helperColor }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-card min-w-0">
      <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-slate-800 leading-tight">{value}</p>
        {helper && (
          <p className="text-xs truncate">
            {typeof helper === "string" ? (
              <span className="text-slate-400">{helper}</span>
            ) : (
              <>
                <span className={`font-semibold ${helperColor}`}>{helper.stat} </span>
                <span className="text-slate-500">{helper.text}</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
