import type { IHeaderParams } from 'ag-grid-community';
import { Tooltip } from '../tooltip/Tooltip';

export type ArborInnerTooltipHeaderParams = {
  tooltipText?: string;
};

/**
 * AG Grid inner header: shows the DS Tooltip for column help while the default
 * column header shell keeps sort, filter, and menu behaviour.
 */
export function ArborDataTableInnerTooltipHeader(props: IHeaderParams) {
  const { displayName, innerHeaderComponentParams } = props;
  const tooltipText = (innerHeaderComponentParams as ArborInnerTooltipHeaderParams | undefined)
    ?.tooltipText;

  if (!tooltipText) {
    return <span className="ag-header-cell-text">{displayName}</span>;
  }

  return (
    <Tooltip content={tooltipText}>
      <span className="ag-header-cell-text">{displayName}</span>
    </Tooltip>
  );
}
