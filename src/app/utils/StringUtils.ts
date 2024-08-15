export class StringUtils {
    // public static String toTimestamp(double runTime) {
    //     final Duration duration = Duration.ofMillis((long)(runTime * 1000L));

    //     long seconds = duration.toSeconds();

    //     long HH = seconds / 3600;
    //     long MM = (seconds % 3600) / 60;
    //     long SS = seconds % 60;
    //     long MS = duration.toMillis() % 1000;

    //     return removeLeadingZeros(String.format("%02d:%02d:%02d.%02d", HH, MM, SS, MS));
    // }

    static toTimestamp(runTime: number): string  {
        let durationMs = runTime * 1000.0;
        
        let hours = Math.floor(runTime / 3600);
        let minutes = Math.floor((runTime % 3600) / 60);
        let seconds = Math.floor(runTime % 60);
        let ms = Math.floor(durationMs % 1000);

        return (hours != 0 ? hours.toString().padStart(2, "0") + ":" : "") +
            minutes.toString().padStart(2, "0") + 
            ":" + 
            seconds.toString().padStart(2, "0") +
            "." + 
            ms.toString();
    }

    static getTimeAgo(epochTime: number): string {
        let date = epochTime;
        let currentDate = Date.now() / 1000;

        if(epochTime == 0) {
            return "the beginning";
        }

        let difference = Math.abs(currentDate - date);
        let days = Math.round(difference / (3600 * 24)); 

        let years: number = Math.round(days / 365);
        let months: number = Math.round(days / 12);
        let hours: number = Math.round(difference / 3600);
        let minutes = Math.round((difference / (60)));

        if(years > 0) {
            return this.formatPluralWord(years, "year");
        } else if(months > 0) {
            return this.formatPluralWord(months, "month");
        } else if(days > 0) {
            return this.formatPluralWord(days, "day");
        } else if(hours > 0) {
            return this.formatPluralWord(hours, "hour");
        } else if (minutes > 0) {
            return this.formatPluralWord(minutes, "minute");
        } else {
            return "less than a minute ago";
        }
    }

    static formatPluralWord(numerator: number, text: string): string {
        return numerator + " " + text + (numerator == 1 ? "" : "s") +" ago";
    }
}
