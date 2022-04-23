import { MatPaginatorIntl } from "@angular/material/paginator";

export function customPaginatorConfiguration() {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = "Nombre de Touits par page";
  return customPaginatorIntl;
}