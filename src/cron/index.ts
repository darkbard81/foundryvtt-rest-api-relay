import * as cron from 'node-cron';
import { resetMonthlyRequests } from './monthlyReset';
import { log } from '../middleware/logger';

// Track scheduled jobs - use the correct type
let monthlyResetJob: cron.ScheduledTask | null = null;

/**
 * Set up all cron jobs for the application
 */
export function setupCronJobs(): void {
  if (!monthlyResetJob) {
    // Reset request counts at midnight on the first day of each month
    // Cron format: minute hour day month day-of-week
    monthlyResetJob = cron.schedule('0 0 1 * *', async () => {
      log.info('Running scheduled monthly request count reset');
      try {
        await resetMonthlyRequests();
        log.info('Monthly request count reset completed successfully via cron job');
      } catch (error) {
        log.error(`Error in monthly reset cron job: ${error}`);
        // Add retry logic
        setTimeout(async () => {
          log.info('Retrying monthly request count reset after failure');
          try {
            await resetMonthlyRequests();
            log.info('Monthly request count reset retry successful');
          } catch (retryError) {
            log.error(`Monthly reset retry also failed: ${retryError}`);
          }
        }, 5 * 60 * 1000); // 5 minutes
      }
    }, {
      timezone: 'UTC'  // Remove the 'scheduled' property - it doesn't exist
    });
    
    // Start the job manually since we removed 'scheduled: true'
    monthlyResetJob.start();
    
    log.info('Monthly request reset cron job scheduled successfully for 00:00 UTC on 1st of each month');
    
    // Also run immediately when starting the server if it's the 1st day of month
    // This ensures we don't miss a reset if the server was down at midnight
    const now = new Date();
    if (now.getDate() === 1) {
      log.info('Today is the 1st day of the month - running request reset immediately');
      resetMonthlyRequests().catch(error => {
        log.error(`Error running immediate monthly reset: ${error}`);
      });
    }
  } else {
    log.warn('Monthly reset job already scheduled - skipping duplicate scheduling');
  }

  log.info('Cron jobs setup completed');
}

/**
 * Stop all cron jobs (useful for graceful shutdown)
 */
export function stopCronJobs(): void {
  if (monthlyResetJob) {
    monthlyResetJob.stop();
    monthlyResetJob = null;
    log.info('Monthly reset cron job stopped');
  }
}

/**
 * Get status of cron jobs
 */
export function getCronJobStatus(): { monthlyReset: { scheduled: boolean; active: boolean } } {
  return {
    monthlyReset: {
      scheduled: monthlyResetJob !== null,
      active: monthlyResetJob !== null // If the job exists, it's active
    }
  };
}

/**
 * Manually trigger the monthly reset (for testing or emergency use)
 */
export async function triggerMonthlyReset(): Promise<void> {
  log.info('Manually triggering monthly request count reset');
  await resetMonthlyRequests();
}
