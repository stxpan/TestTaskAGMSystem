import { twx } from '@/shared/lib/cn';

// Basic empty state with action
//       <EmptyState>
//         <EmptyStateIcon>
//           <RiMessageLine />
//         </EmptyStateIcon>

//         <EmptyStateTitle>No projects</EmptyStateTitle>

//         <EmptyStateDescription>Get started by creating a new project.</EmptyStateDescription>

//         <EmptyStateActions>
//           <Button>
//             <RiAddLine className="mr-2" />
//             New Project
//           </Button>
//         </EmptyStateActions>
//       </EmptyState>

// State with some content and action
//       <EmptyState className="items-start">
//         <EmptyStateTitle>Projects</EmptyStateTitle>

//         <EmptyStateDescription>
//           You haven’t created a project yet. Get started by selecting a template or start from an empty project.
//         </EmptyStateDescription>

//         <EmptyStateContent>weq qwe</EmptyStateContent>

//         <EmptyStateActions className="justify-start">
//           <Button variant="link" size="link">
//             Or start from an empty project
//             <RiAddLine className="ml-2" />
//           </Button>
//         </EmptyStateActions>
//       </EmptyState>

// Empty state as a button
//       <EmptyStateButton>
//         <EmptyStateIcon>
//           <Ri4KLine />
//         </EmptyStateIcon>

//         <EmptyStateTitle>Create a new Project</EmptyStateTitle>
//       </EmptyStateButton>

export const EmptyState = twx.div`flex flex-col items-center justify-center p-4 flex-1`;
export const EmptyStateButton = twx.button`p-4 flex flex-1 flex-col rounded-md items-center justify-center border-2 border-dashed hover:border-slate-300`;

export const EmptyStateIcon = twx.div`text-5xl text-gray-400`;
export const EmptyStateTitle = twx.span`text-md font-semibold`;
export const EmptyStateDescription = twx.p`text-sm text-muted-foreground`;

export const EmptyStateContent = twx.div`py-4 border-y w-full mt-4`;

export const EmptyStateActions = twx.div`mt-4 flex space-x-2 w-full justify-center`;
