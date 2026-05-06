import React, { useState, useMemo } from 'react';
import './Table.css';
import { Button } from '../../elements/Button';
import { Input } from '../../elements/Input';

// Base Components
export const TableContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={`qasah-table-container ${className}`} {...props}>
    {children}
  </div>
);

export const TableElement: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className = '', children, ...props }) => (
  <table className={`qasah-table ${className}`} {...props}>
    {children}
  </table>
);

export const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', children, ...props }) => (
  <thead className={`qasah-table-head ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', children, ...props }) => (
  <tbody className={`qasah-table-body ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className = '', children, ...props }) => (
  <tr className={`qasah-table-row ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHeader: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({ className = '', children, ...props }) => (
  <th className={`qasah-table-header-cell ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = ({ className = '', children, ...props }) => (
  <td className={`qasah-table-cell ${className}`} {...props}>
    {children}
  </td>
);

// Data Table Implementation

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (info: { row: T; getValue: () => unknown }) => React.ReactNode;
  id?: string;
}

export interface TableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
  data?: T[];
  columns?: ColumnDef<T>[];
  pagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  variant?: 'striped' | 'default';
  emptyMessage?: React.ReactNode;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  pagination = false,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  variant = 'default',
  emptyMessage = 'No results found',
  className = '',
  children,
  ...props
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const paginatedData = useMemo(() => {
    if (!data || !pagination) return data ?? [];
    const startIdx = (currentPage - 1) * pageSize;
    return data.slice(startIdx, startIdx + pageSize);
  }, [data, pagination, currentPage, pageSize]);

  // If using as a manual compound component without data/columns
  if (!data || !columns) {
    return (
      <TableContainer>
        <TableElement className={`qasah-table--${variant} ${className}`} {...props}>
          {children}
        </TableElement>
      </TableContainer>
    );
  }

  // Derived Pagination State
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <TableContainer>
      <div className="qasah-table-scroll-wrapper">
        <TableElement className={`qasah-table--${variant} ${className}`} {...props}>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHeader key={col.id || (col.accessorKey as string) || idx}>
                  {col.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const value = col.accessorKey ? row[col.accessorKey as string] : undefined;
                    return (
                      <TableCell key={col.id || (col.accessorKey as string) || colIndex}>
                        {col.cell ? col.cell({ row, getValue: () => value }) : value as React.ReactNode}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="qasah-table-empty">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableElement>
      </div>

      {pagination && (
        <div className="qasah-table-pagination">
          <div className="qasah-table-pagination-info">
            Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} to{' '}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
          </div>
          <div className="qasah-table-pagination-controls">
            <div className="qasah-table-page-size">
              <span className="qasah-table-page-size-label">Rows per page:</span>
              <Input
                state="input dropdown"
                size="sm"
                hasLabel={false}
                hasHelperText={false}
                hasLeftIcon={false}
                value={pageSize.toString()}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                options={pageSizeOptions.map(opt => ({ label: opt.toString(), value: opt.toString() }))}
              />
            </div>
            <div className="qasah-table-page-actions">
              <Button
                variant="grey"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <div className="qasah-table-page-current">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="grey"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </TableContainer>
  );
}
