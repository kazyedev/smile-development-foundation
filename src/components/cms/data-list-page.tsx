"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, ArrowUpDown } from "lucide-react";

interface DataListPageProps {
  title: string;
  description?: string;
  children?: ReactNode;
  onAdd?: () => void;
  onRefresh?: () => void;
  onSort?: () => void;
  addLabel?: string;
  refreshLabel?: string;
  sortLabel?: string;
}

export default function DataListPage({
  title,
  description,
  children,
  onAdd,
  onRefresh,
  onSort,
  addLabel = "Add New",
  refreshLabel = "Refresh",
  sortLabel = "Sort"
}: DataListPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2">
          {onSort && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSort}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">{sortLabel}</span>
            </Button>
          )}
          
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">{refreshLabel}</span>
            </Button>
          )}
          
          {onAdd && (
            <Button
              size="sm"
              onClick={onAdd}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{addLabel}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-lg">
        {children || (
          <div className="p-8 text-center">
            <div className="text-muted-foreground">
              <div className="text-lg mb-2">No data available</div>
              <p className="text-sm">This section is under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
