import { Button } from 'antd';
import { RotateCcw } from 'lucide-react';

const ResetFiltersButton = ({ onReset, hasActiveFilters, loading = false }) => {
  if (!hasActiveFilters) return null;

  return (
    <Button
      onClick={onReset}
      disabled={loading}
      title="Reset all filters and search"
      size="small"
      type="default"
      shape="circle"
    >
      <RotateCcw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
    </Button>
  );
};

export default ResetFiltersButton;
