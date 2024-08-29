import { usePathname } from 'next/navigation'
import { useClientToolsStore } from 'hooks/useClientToolsStore'
import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Nav } from '../Global/Nav'
import { ClientToolsHeader } from './ClientToolsHeader'
import { ArchiveHeader } from './ArchiveHeader'
import { ViewSelector } from '../Global/ViewSelector'
import { ClientToolsFilters } from '../ClientTools/ClientToolsFilters'
import { ProjectHeader } from './ProjectHeader'
import { HeaderTab } from './HeaderTab'

export const HeaderUnlocked = ({ categories, materials, activeProject }) => {
  const path = usePathname()
  const { activeMaterial } = useClientToolsStore((state) => state)

  const activeMaterialProps = useMemo(() => {
    if (!activeMaterial) return materials?.[0]
    return materials?.find((material) => material.slug === activeMaterial)
  }, [activeMaterial, materials])

  const viewSelectorActive = path === '/archive' || path === '/client-tools'

  return (
    <header className="relative z-[10] grid grid-cols-2 gap-10 pl-55 md:col-span-3 md:col-start-2 md:grid-cols-3 md:pl-0">
      <NavSection
        path={path}
        categories={categories}
        activeProject={activeProject}
      />
      <MainHeaderSection
        path={path}
        categories={categories}
        materials={materials}
        activeProject={activeProject}
      />
      <ViewSelectorSection
        path={path}
        viewSelectorActive={viewSelectorActive}
      />
      <SideHeaderSection
        path={path}
        activeMaterialProps={activeMaterialProps}
        activeProject={activeProject}
      />
    </header>
  )
}

const NavSection = ({ path, categories, activeProject }) => (
  <div className="col-start-1 row-start-1 flex flex-col gap-10">
    <Nav />
    <AnimatePresence mode="wait" initial={false}>
      {path?.includes('/archive') ? (
        <ArchiveHeader
          className="pt-10 md:hidden"
          categories={categories}
          activeCategories={activeProject?.categories}
          key="archive-project"
        />
      ) : path?.includes('/client-tools') ? (
        <HeaderTab key="placeholder">
          <span className="hidden"></span>
        </HeaderTab>
      ) : null}
    </AnimatePresence>
  </div>
)

const MainHeaderSection = ({ path, categories, materials, activeProject }) => (
  <AnimatePresence mode="wait" initial={false}>
    {path?.includes('/archive') ? (
      <ArchiveHeader
        className={'hidden md:block'}
        categories={categories}
        activeCategories={activeProject?.categories}
        key="archive"
      />
    ) : path?.includes('/client-tools') ? (
      <ClientToolsHeader materials={materials} key="client-tools" />
    ) : null}
  </AnimatePresence>
)

const ViewSelectorSection = ({ path, viewSelectorActive }) => (
  <AnimatePresence mode="wait" initial={false}>
    {viewSelectorActive ? (
      <ViewSelector key={`view-selector-${path}`} />
    ) : (
      <HeaderTab key="placeholder-view-selector">
        <span></span>
      </HeaderTab>
    )}
  </AnimatePresence>
)

const SideHeaderSection = ({ path, activeMaterialProps, activeProject }) => (
  <>
    <AnimatePresence mode="wait" initial={false}>
      {path?.includes('/client-tools') ? (
        <ClientToolsFilters
          {...activeMaterialProps}
          key={`client-tools-filters`}
        />
      ) : (
        <HeaderTab
          className="col-start-1 row-start-3"
          key="placeholder-filters"
        >
          <span></span>
        </HeaderTab>
      )}
    </AnimatePresence>

    <AnimatePresence mode="wait" initial={false}>
      {path !== '/archive' && path?.includes('/archive') && activeProject ? (
        <ProjectHeader
          {...activeProject}
          key={`${activeProject?._id}-${path}`}
        />
      ) : (
        <HeaderTab
          className="col-start-1 row-start-3"
          key="placeholder-project-header"
        >
          <span></span>
        </HeaderTab>
      )}
    </AnimatePresence>
  </>
)
