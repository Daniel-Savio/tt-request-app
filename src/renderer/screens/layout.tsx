import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog'
import { toast } from 'sonner'
import { Github } from 'lucide-react'
import { set } from 'zod'



export function Layout() {
  const [isGitInstalling, setIsGitInstalling] = useState(false)
  const [gitInstallStatus, setGitInstallStatus] = useState('')

  useEffect(() => {
    const removeGitListener = window.App.gitStatus((info: any) => {

      setIsGitInstalling(!info.status);
      setGitInstallStatus(info.data);


    });

    if (!isGitInstalling) {
      toast(`Git já instalado`, { invert: true, richColors: true, duration: 2000, icon: <Github className="text-green-600 size-4" /> });
    }
    return () => {
      removeGitListener();
    };
  }, []);



  return (
    <div className="bg-radial-[at_25%_25%] from-slate-950 to-slate- to-75">
      <main className="mx-auto overflow-y-hidden ">
        <Outlet />
      </main>

      <AlertDialog open={isGitInstalling} onOpenChange={setIsGitInstalling}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex items-center gap-2'><Github className="text-teal-400 size-4" /> Git Installation</AlertDialogTitle>
            <AlertDialogDescription className='felx justify-center mt-4 text-sm text-slate-400'>
              {gitInstallStatus}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
