import { format, getTime, formatDistanceToNow } from "date-fns";
import { useTranslation } from "react-i18next";
import { enUS, pl } from 'date-fns/locale';

// ----------------------------------------------------------------------

export function fDate(
    date: Date | string | number,
    newFormat?: string
): string {
    const fm = newFormat || "dd MMM yyyy";
    return date ? format(new Date(date), fm) : "";
}

export function fDateTime(
    date: Date | string | number,
    newFormat?: string
): string {
    const fm = newFormat || "dd MMM yyyy p";
    return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: Date | string | number): number | string {
    return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: Date | string | number): string {
    const { i18n } = useTranslation();

    const locale = i18n.language === 'pl' ? pl : enUS;
    
    return date
        ? formatDistanceToNow(new Date(date), {
                addSuffix: true,
                locale
          })
        : "";
}
