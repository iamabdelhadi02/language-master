<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Language Master Expo app.

**What was set up:**

- Installed `posthog-react-native` and `react-native-svg` (required peer dep)
- Created `app.config.js` to expose `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` via `expo-constants`
- Created `src/lib/posthog.ts` — the PostHog client singleton, configured via `Constants.expoConfig.extra`
- Updated `src/app/_layout.tsx` — wrapped the app in `PostHogProvider`, added manual screen tracking (Expo Router), and identifies the user from their Clerk session on app launch
- Added `posthog.capture()` calls across 5 screens covering the full user journey from onboarding through daily learning

| Event | Description | File |
|---|---|---|
| `get_started_tapped` | User taps "Get Started" on the onboarding screen — top of the acquisition funnel | `src/app/onboarding.tsx` |
| `sign_up_completed` | User successfully completes email/password sign-up and verifies their email | `src/components/AuthScreen.tsx` |
| `sign_in_completed` | User successfully signs in via email OTP verification | `src/components/AuthScreen.tsx` |
| `social_auth_started` | User initiates an OAuth flow via Google, Facebook, or Apple | `src/components/AuthScreen.tsx` |
| `language_selected` | User selects and confirms a language to learn | `src/app/language-select.tsx` |
| `continue_learning_tapped` | User taps the Continue button to resume their current unit | `src/app/(tabs)/home.tsx` |
| `today_plan_item_tapped` | User taps a lesson item in today's plan | `src/app/(tabs)/home.tsx` |
| `next_up_tapped` | User taps the Next Up card to start an AI video call lesson | `src/app/(tabs)/home.tsx` |
| `sign_out` | User signs out of the app | `src/app/index.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1649837)
- [Acquisition funnel](/insights/1dNiXVRZ) — Get Started → Sign-up → Language selected
- [Auth activity over time](/insights/9A9zw9At) — Sign-ups and sign-ins per day
- [Language popularity](/insights/GISbGHvb) — Which languages users pick most
- [Learning engagement](/insights/KOhhB2BE) — Continue learning, plan taps, and Next Up taps
- [Churn — sign-outs over time](/insights/oFwEbkhA)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
